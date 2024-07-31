import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  EffectComposer,
  RenderPass,
} from 'postprocessing';
import GUI from 'lil-gui';
import Stats from 'stats.js';
// Assets
import logo from '/og.png';
// Constants
import { isDevelopment } from '@/scripts/constants';

export default class ThreeScene {
  isActive = true;
  animationFrameId = null;
  scene = new THREE.Scene();

  clock = new THREE.Clock();
  previousTime = 0;

  scrollSpeed = 0;
  currentScroll = 0;
  prevScroll = 0;
  
  currentMouse = new THREE.Vector2(0, 0);
  prevMouse = new THREE.Vector2(0, 0);

  sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  }

  aspect = this.sizes.width / this.sizes.height;
  cameraScale = 2;

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
    this.fontLoader = new FontLoader(this.loadingManager);

    this.texture = this.textureLoader.load(logo);
  }

  onLoadProgress(itemUrl, itemsLoaded, itemsTotal) {
    if (isDevelopment) {
      // console.log(`Loading... ${Math.round((itemsLoaded / itemsTotal) * 100)}%`);
    }
  }

  onLoadDone() {
    this.setupCamera();
    this.setupControls();
    this.setupRenderer();
    this.setupObjects();
    this.setupComposer();
    this.setupScene();
    if (isDevelopment) {
      this.setupGUI();
    }

    window.addEventListener('pointermove', this.onPointerMove.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this));

    this.tick();
  }

  // SETUP
  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(70, this.sizes.width / this.sizes.height, 0.01, 100);
    this.camera.position.z = -2;
    this.scene.add(this.camera);
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.enableRotate = true;
    this.controls.enabled = isDevelopment;
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      canvas: this.canvas,
      alpha: false,
      antialias: false,
      stencil: false,
      depth: false,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor('#000000');
  }

  setupObjects() {
    this.sphere = {
      geometry: new THREE.SphereGeometry(1, 32, 32),
      material: new THREE.MeshBasicMaterial({
				color: 'red',
				wireframe: true,
			}),
      mesh: null,
    }
    this.sphere.mesh = new THREE.Mesh(this.sphere.geometry, this.sphere.material);
    this.scene.add(this.sphere.mesh);
  }

  setupComposer() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
  }

  setupScene() {}

  // TICK
  tick() {
    if (isDevelopment) this.stats.begin();

    // Time
    const elapsedTime = this.clock.getElapsedTime();
    this.previousTime = elapsedTime;

    // Scroll
    const scrollDeltaY = this.currentScroll - this.prevScroll;
    this.scrollSpeed = scrollDeltaY / elapsedTime;
    this.prevScroll = this.currentScroll;

    // Mouse
    this.prevMouse.copy(this.currentMouse);

    // Materials
    
    // Effects
    this.cameraMovement();

    // Update controls
    this.controls.update()

    // Renderer
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();

    if (isDevelopment) this.stats.end();
    
    // Call tick on next frame
    if (this.isActive) {
      this.animationFrameId = requestAnimationFrame(this.tick.bind(this));
    }
  }

  cameraMovement() {
    const cameraMovementStrength = 0.05;
    this.camera.position.y = THREE.MathUtils.lerp(
      this.camera.position.y,
      -this.currentMouse.y * cameraMovementStrength,
      0.1,
    );
    this.camera.position.x = THREE.MathUtils.lerp(
      this.camera.position.x,
      -this.currentMouse.x * cameraMovementStrength,
      0.1,
    );
  }

  // EVENTS
  onResize() {
    // Sizes
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    // Renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Post processing
    this.composer.setSize(this.sizes.width, this.sizes.height);
  }

  onScroll = (e) => {
    this.currentScroll = document.documentElement.scrollTop;
  }

  onPointerMove = (e) => {
    // Convert x and y values from a range of -1 to 1
    this.currentMouse.x = (e.clientX / this.sizes.width) * 2 - 1;
    this.currentMouse.y = - (e.clientY / this.sizes.height) * 2 + 1;
  }

  // GUI
  setupGUI = () => {
    this.gui = new GUI({ width: 340 });
  }

  dispose = () => {
    this.isActive = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.scene.traverse((object) => {
      if (!object.isMesh) return;

      if (object.geometry) {
        object.geometry.dispose();
      }

      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });

    while (this.scene.children.length > 0) {
      const object = this.scene.children[0];
      this.scene.remove(object);
    }

    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement = null;

    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }
}
