import * as THREE from 'three';
import gsap from 'gsap';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import RoundedPlaneGeometry from '@/scripts/three/geometries/RoundedPlaneGeometry';
import GUI from 'lil-gui';
import Stats from 'stats.js';
// Shaders
import imageFragmentShader from '@/scripts/three/images/blur/shaders/image/fragment.glsl';
import imageVertexShader from '@/scripts/three/images/blur/shaders/image/vertex.glsl';
import postprocessingFragmentShader from '@/shaders/postprocessing/scroll-distortion/fragment.glsl';
import postprocessingVertexShader from '@/shaders/postprocessing/scroll-distortion/vertex.glsl';
// Constants
import { isDevelopment } from '@/scripts/constants';

// ADD IMAGES TO THE DOM LIKE THE FOLLOWING
{/* <figure v-for="image in images" class="three-image-container">
  <img :src="image.src" :alt="image.alt" class="w-full h-auto three-image" />
  <figcaption>Caption</figcaption>
</figure> */}

export default class ThreeScene {
  isActive = true;
  animationFrameId = null;
  scene = new THREE.Scene();

  clock = new THREE.Clock();
  previousTime = 0;

	raycaster = new THREE.Raycaster();

  scrollSpeed = 0;
  currentScroll = document.documentElement.scrollTop;
  prevScroll = document.documentElement.scrollTop;
  
  currentMouse = new THREE.Vector2(0, 0);
  prevMouse = new THREE.Vector2(0, 0);

  sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  }

  aspect = this.sizes.width / this.sizes.height;

  domImageContainers = [...document.querySelectorAll('.three-image-container')];
	images = [];
	imageBaseMaterial = new THREE.ShaderMaterial({
		uniforms:{
			uTime: new THREE.Uniform(0),
			uImage: new THREE.Uniform(0),
			uHover: new THREE.Uniform(new THREE.Vector2(0.5, 0.5)),
			uHoverState: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
      uScrollSpeed: new THREE.Uniform(0),
		},
		side: THREE.DoubleSide,
		fragmentShader: imageFragmentShader,
		vertexShader: imageVertexShader,
	});

  constructor(canvas) {
    this.canvas = canvas;
    if (isDevelopment && import.meta.client) {
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(this.stats.dom);
    }
    this.setupLoaders();
  }

  // LOADING
  setupLoaders() {
    this.loadingManager = new THREE.LoadingManager(
      this.onLoadDone.bind(this),
      this.onLoadProgress.bind(this),
    );
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);

    this.domImageContainers.forEach((container) => {
      const img = container.querySelector('.three-image');
			this.textureLoader.load(img.src, (texture) => {
				this.images.push({
          domImageContainer: container,
					domImage: img,
					texture,
				});
			});
		})
  }

  onLoadProgress(itemUrl, itemsLoaded, itemsTotal) {
    if (isDevelopment) {
      // console.log(`Loading... ${Math.round((itemsLoaded / itemsTotal) * 100)}%`);
    }
  }

  onLoadDone() {
    this.setupCamera();
    this.setupRenderer();
    this.setupObjects();
    this.setupComposer();
    if (isDevelopment) {
      this.setupGUI();
    }

    window.addEventListener('pointermove', this.onPointerMove.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
    this.tick();
  }

  // SETUP
  setupCamera() {
		const cameraDistance = 500;
		this.camera = new THREE.PerspectiveCamera(70, this.sizes.width / this.sizes.height, 0.01, 2000);
    this.camera.position.z = cameraDistance;
    this.camera.fov = 2 * Math.atan((this.sizes.height / 2) / cameraDistance) * (180 / Math.PI);
		this.camera.aspect = this.aspect;
		this.camera.updateProjectionMatrix();
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setupObjects() {
		this.images.forEach((img) => {
			// Bounds
			this.setImageBoundingRect(img);

			// Geometry
      const roundedPlaneGeometry = new RoundedPlaneGeometry(img.bounds.width, img.bounds.height, 20, 12);
			img.geometry = roundedPlaneGeometry;

			// Material
			img.material = this.imageBaseMaterial.clone();
			img.material.uniforms.uImage.value = img.texture;
      img.material.uniforms.uResolution.value = new THREE.Vector2(img.bounds.width, img.bounds.height);

			// Mesh
			img.mesh = new THREE.Mesh(img.geometry, img.material);
			this.scene.add(img.mesh);

      // Hover timeline
      const imageHoverTimeline = gsap.timeline({ paused: true }).timeScale(1.5)
        .to(img.material.uniforms.uHoverState, {
          value: 0.5,
          duration: 0.1,
          ease: "power3.inOut",
        }, 0)
        .to(img.material.uniforms.uHoverState, {
          value: 0.4,
          duration: 0.1,
          ease: "power3.inOut", 
        }, '>')
        .to(img.material.uniforms.uHoverState, {
          value: 1.0,
          duration: 0.1,
          ease: "power3.inOut", 
        }, '>')
        .to(img.material.uniforms.uHoverState, {
          value: 0.4,
          duration: 0.15,
          ease: "power3.inOut", 
        }, '>')
        .to(img.material.uniforms.uHoverState, {
          value: 0.6,
          duration: 0.05,
          ease: "power3.inOut",
        }, '>')
        .to(img.material.uniforms.uHoverState, {
          value: 0,
          duration: 0.2,
          ease: "power3.inOut", 
        }, '>');

			// Event listeners
			img.domImageContainer.addEventListener('mouseenter', () => {
				imageHoverTimeline.play();
			});
			img.domImageContainer.addEventListener('mouseleave', () => {
				imageHoverTimeline.reverse();
			});
		});
		this.setImagePositions();
  }

  setImageBoundingRect(img) {
    let domImageBounds = img.domImage.getBoundingClientRect();
		img.bounds = {
			top: domImageBounds.top + window.scrollY,
			left: domImageBounds.left,
			width: domImageBounds.width,
			height: domImageBounds.height,
		};
  }

	setImagePositions() {
		this.images.forEach(img => {
			const newXPosition = img.bounds.left - this.sizes.width / 2 + img.bounds.width / 2;
			const newYPosition = this.currentScroll - img.bounds.top + this.sizes.height / 2 - img.bounds.height / 2;
			img.mesh.position.x = newXPosition;
			img.mesh.position.y = newYPosition;
		});
	}

  setupComposer() {
		const renderTarget = new THREE.WebGLRenderTarget(800, 600, { samples: 2 });
    this.composer = new EffectComposer(this.renderer, renderTarget);
		this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.composer.setSize(this.sizes.width, this.sizes.height);

		// Render pass
    this.composer.addPass(new RenderPass(this.scene, this.camera));

		// Shader pass
		this.scrollDistortionShaderPass = new ShaderPass({
			uniforms: {
				tDiffuse: new THREE.Uniform(null),
				uScrollSpeed: new THREE.Uniform(0),
				uTime: new THREE.Uniform(null),
			},
			vertexShader: postprocessingVertexShader,
			fragmentShader: postprocessingFragmentShader
		});
		this.scrollDistortionShaderPass.renderToScreen = true;

		this.composer.addPass(this.scrollDistortionShaderPass);

		// ANTIALIAS
		if (this.renderer.getPixelRatio() === 1 && !this.renderer.capabilities.isWebGL2) {
			const smaaPass = new SMAAPass();
			this.composer.addPass(smaaPass);
		}
  }

  // TICK
  tick() {
    if (isDevelopment) this.stats.begin();

    // Time
    const elapsedTime = this.clock.getElapsedTime();
    const timeDelta = elapsedTime - this.previousTime;
    this.previousTime = elapsedTime;

    // Scroll
    this.currentScroll = document.documentElement.scrollTop;
    const scrollDeltaY = this.currentScroll - this.prevScroll;
		const targetScrollSpeed = timeDelta ? scrollDeltaY * timeDelta : 0;
		this.scrollSpeed = THREE.MathUtils.lerp(
			this.scrollSpeed,
			targetScrollSpeed,
			0.1,
		);
    this.prevScroll = this.currentScroll;

    // Mouse
    this.prevMouse.copy(this.currentMouse);

    // Materials
		this.images.forEach((img) => {
			img.mesh.material.uniforms.uTime.value = elapsedTime;
      img.mesh.material.uniforms.uScrollSpeed.value = Math.abs(this.scrollSpeed);
		})
		this.setImagePositions();
		this.scrollDistortionShaderPass.uniforms.uScrollSpeed.value = this.scrollSpeed;
		this.scrollDistortionShaderPass.uniforms.uTime.value = elapsedTime;

    // Renderer
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();

    if (isDevelopment) this.stats.end();
    
    // Call tick on next frame
    if (this.isActive) {
      this.animationFrameId = requestAnimationFrame(this.tick.bind(this));
    }
  }

  // EVENTS
  onResize() {
    // Sizes
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.aspect = this.sizes.width / this.sizes.height;

    // Update camera
		this.camera.aspect = this.aspect;
		this.camera.updateProjectionMatrix();

    // Materials
    this.images.forEach((img) => {
      // Update bounds
      this.setImageBoundingRect(img);
      img.material.uniforms.uResolution.value = new THREE.Vector2(img.bounds.width, img.bounds.height);
  
      // Update geometry
      img.geometry.dispose();
      const roundedPlaneGeometry = new RoundedPlaneGeometry(img.bounds.width, img.bounds.height, 20, 12);
			img.mesh.geometry = roundedPlaneGeometry;
    });

    // Renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Post processing
    this.composer.setSize(this.sizes.width, this.sizes.height);
  }

  onPointerMove = (e) => {
    // Convert x and y values from a range of -1 to 1
    this.currentMouse.x = (e.clientX / this.sizes.width) * 2 - 1;
    this.currentMouse.y = - (e.clientY / this.sizes.height) * 2 + 1;

		// update the picking ray with the camera and mouse position
		this.raycaster.setFromCamera(this.currentMouse, this.camera);

		// calculate objects intersecting the picking ray
		const intersects = this.raycaster.intersectObjects(this.scene.children);

		if(intersects.length > 0) {
			let obj = intersects[0].object;
			obj.material.uniforms.uHover.value = intersects[0].uv;
		}
  }

  // GUI
  setupGUI = () => {
    this.gui = new GUI({ width: 340 });
  }
}
