import * as OGL from 'ogl';
import GUI from 'lil-gui';
// Assets
import image from '/svg/netlio.svg';
// Shaders
import vertexShader from '@/scripts/ogl/flowmap/shaders/flowmap/vertex.glsl';
import fragmentShader from '@/scripts/ogl/flowmap/shaders/flowmap/fragment.glsl';
// Constants
import { isDevelopment } from '@/scripts/constants';

export default class OGLScene {
  canvas;
  renderer;
  gl;
	aspect = 1;
  velocity = new OGL.Vec2();
	isTouchCapable = 'ontouchstart' in window;
	prevTime;
	currentTime;
	prevMouse = new OGL.Vec2();
	currentMouse = new OGL.Vec2(-1);
  scene;

	flowmapConfig = {
		falloff: 0.35,
		dissipation: 0.9,
		strength: 0.05,
	}

  constructor(canvas) {
    this.canvas = canvas;
    this.setupRenderer();
    this.setupScene();
		// if (isDevelopment) {
    //   this.setupGUI();
    // }

    window.addEventListener("resize", this.onResize.bind(this), false);
    if (this.isTouchCapable) {
      window.addEventListener('touchstart', this.onMouseMove.bind(this), false);
      window.addEventListener('touchmove', this.onMouseMove.bind(this), false);
    } else {
      window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    }

    this.tick();
  }

  setupRenderer = () => {
    this.renderer = new OGL.Renderer({
      canvas: this.canvas,
			dpr: 2,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.gl = this.renderer.gl;
  }

  setupScene = () => {
		this.scene = new OGL.Transform();
		this.flowmap = new OGL.Flowmap(this.gl, {
			falloff: this.flowmapConfig.falloff,
			dissipation: this.flowmapConfig.dissipation,
		});

		// Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
		this.geometry = new OGL.Geometry(this.gl, {
			position: {
				size: 2,
				data: new Float32Array([
					-1, -1,
					3, -1,
					-1, 3,
				]),
			},
			uv: {
				size: 2,
				data: new Float32Array([
					0, 0,
					2, 0,
					0, 2,
				]),
			},
		});

		this.texture = new OGL.Texture(this.gl, {
			minFilter: this.gl.LINEAR,
			magFilter: this.gl.LINEAR,
			premultiplyAlpha: true,
		});
		const img = new Image();
		img.onload = () => {
			this.texture.image = img;
		};
		img.src = image;
		this.imgSize = new OGL.Vec2(2815, 2815);
		if (this.isTouchCapable) {
			this.imgSize = new OGL.Vec2(1179, 1183);;
			img.src = "/svg/netlio-mobile.svg";
		}

		this.imageAspect = this.imgSize.y / this.imgSize.x;

		this.program = new OGL.Program(this.gl, {
			vertex: vertexShader,
			fragment: fragmentShader,
			uniforms: {
        uTime: { value: 0 },
        uImage: { value: this.texture },
				uFlowmapStrength: { value: this.flowmapConfig.strength },
				uImageSize: {
					value: new OGL.Vec2(this.imgSize.x, this.imgSize.y),
				},
        uScreenSize: {
          value: new OGL.Vec2(window.innerWidth, window.innerHeight),
        },
        // Note that the uniform is applied without using an object and value property
        // This is because the class alternates this texture between two render targets
        // and updates the value property after each render.
        tFlow: this.flowmap.uniform,
      }
		});

		this.mesh = new OGL.Mesh(this.gl, {
			geometry: this.geometry,
			program: this.program,
		});
		this.scene.addChild(this.mesh);
  }

  tick = (t) => {
    this.renderer.render({
      scene: this.scene,
    });

		if (isDevelopment) {
			// this.flowmap.mesh.program.uniforms.uDissipation.value = this.flowmapConfig.dissipation;
			// this.flowmap.mesh.program.uniforms.uFalloff.value = this.flowmapConfig.falloff;
			this.mesh.program.uniforms.uFlowmapStrength.value = this.flowmapConfig.strength;
		}

    // Reset velocity when mouse not moving
		if (!this.velocity.needsUpdate) {
			this.currentMouse.set(-1);
			this.velocity.set(0);
		}
		this.velocity.needsUpdate = false;

		// Update flowmap inputs
		this.flowmap.aspect = this.aspect;
		this.flowmap.mouse.copy(this.currentMouse);
		// Ease velocity input, slower when fading out
		this.flowmap.velocity.lerp(this.velocity, this.velocity.len() ? 0.5 : 0.1);
		this.flowmap.update();

		this.program.uniforms.uTime.value = t * 0.001;

    requestAnimationFrame(this.tick.bind(this));
  }

  onResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.aspect = window.innerWidth / window.innerHeight;

		this.mesh.program.uniforms.uScreenSize.value = new OGL.Vec2(window.innerWidth, window.innerHeight);
		this.mesh.program.uniforms.uImageSize.value = new OGL.Vec2(this.imgSize.x, this.imgSize.y);
  }

	onMouseMove = (e) => {
    let newMouseX = e.x;
    let newMouseY = e.y;
		if (e.changedTouches && e.changedTouches.length) {
			newMouseX = e.changedTouches[0].pageX;
			newMouseY = e.changedTouches[0].pageY;
		}
		if (e.x === undefined) {
			newMouseX = e.pageX;
			newMouseY = e.pageY;
		}

    // Adjust for window scroll
    newMouseX += window.scrollX;
    newMouseY += window.scrollY;

		// Get mouse value in 0 to 1 range, with y flipped
		this.currentMouse.set(
			newMouseX / this.gl.renderer.width,
			1.0 - newMouseY / this.gl.renderer.height,
		);

		// Calculate velocity
		if (!this.prevTime) {
			// First frame
			this.prevTime = performance.now();
			this.prevMouse.set(newMouseX, newMouseY);
		}

		const deltaX = newMouseX - this.prevMouse.x;
		const deltaY = newMouseY - this.prevMouse.y;

		this.prevMouse.set(newMouseX, newMouseY);

		this.currentTime = performance.now();

		// Avoid dividing by 0
		let delta = Math.max(14, this.currentTime - this.prevTime);
		this.prevTime = this.currentTime;

		this.velocity.x = deltaX / delta;
		this.velocity.y = deltaY / delta;

		// Flag update to prevent hanging velocity values when not moving
		this.velocity.needsUpdate = true;
	}

	  // GUI
		setupGUI = () => {
			this.gui = new GUI({ width: 340 });

			const flowmapFolder = this.gui.addFolder('Flowmap');
			flowmapFolder.add(this.flowmapConfig, 'dissipation').name('Dissipation').min(0).max(1);
			flowmapFolder.add(this.flowmapConfig, 'falloff').name('Falloff').min(0).max(1);
			flowmapFolder.add(this.flowmapConfig, 'strength').name('Strength').min(0).max(1);
		}
}
