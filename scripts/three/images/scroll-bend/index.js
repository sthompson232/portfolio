import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import GUI from 'lil-gui';
import Stats from 'stats.js';
// Shaders
import imageFragmentShader from '@/scripts/three/images/scroll-bend/shaders/image/fragment.glsl';
import imageVertexShader from '@/scripts/three/images/scroll-bend/shaders/image/vertex.glsl';
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
  
	mouseSpeed = 0;
  currentMouse = new THREE.Vector2(0, 0);
	lerpedCurrentMouse = new THREE.Vector2(0, 0);
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
			uImage: new THREE.Uniform(0),
			uScrollSpeed: new THREE.Uniform(0),
			uIntensity: new THREE.Uniform(0.1),
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
      const planeGeometry = new THREE.PlaneGeometry(img.bounds.width, img.bounds.height, 80, 80);
			img.geometry = planeGeometry;

			// Material
			img.material = this.imageBaseMaterial.clone();
			img.material.uniforms.uImage.value = img.texture;

			// Mesh
			img.mesh = new THREE.Mesh(img.geometry, img.material);
			this.scene.add(img.mesh);
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
		this.lerpedCurrentMouse.x = THREE.MathUtils.lerp(
			this.lerpedCurrentMouse.x,
			this.currentMouse.x,
			0.1,
		);
		this.lerpedCurrentMouse.y = THREE.MathUtils.lerp(
			this.lerpedCurrentMouse.y,
			this.currentMouse.y,
			0.1,
		);

		const currentMouseDeltaX = Math.abs(this.lerpedCurrentMouse.x - this.prevMouse.x);
		const currentMouseDeltaY = Math.abs(this.lerpedCurrentMouse.y - this.prevMouse.y);
		const targetMouseSpeed = (currentMouseDeltaX + currentMouseDeltaY) / 2;
		this.mouseSpeed = THREE.MathUtils.lerp(
			this.mouseSpeed,
			targetMouseSpeed,
			0.1,
		);
		this.prevMouse.copy(this.currentMouse);


    // Materials
		this.images.forEach((img) => {
			img.material.uniforms.uScrollSpeed.value = this.scrollSpeed;
		})

		this.setImagePositions();

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
  
      // Update geometry
      img.geometry.dispose();
      const planeGeometry = new THREE.PlaneGeometry(img.bounds.width, img.bounds.height, 80, 80);
			img.mesh.geometry = planeGeometry;
    });

    // Renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Post processing
    this.composer.setSize(this.sizes.width, this.sizes.height);
  }

	onPointerMove = (e) => {
    this.currentMouse.x = e.clientX / this.sizes.width;
    this.currentMouse.y = 1 - (e.clientY / this.sizes.height);
  }

  // GUI
  setupGUI = () => {
    this.gui = new GUI({ width: 340 });
  }
}
