import * as OGL from 'ogl';
// Shaders
import vertexShader from '@/scripts/ogl/mouse/shaders/mouse/vertex.glsl';
import fragmentShader from '@/scripts/ogl/mouse/shaders/mouse/fragment.glsl';

export default class OGLScene {
  canvas;
  renderer;
  gl;
  camera;
  mouse = new OGL.Vec3();
  controls;
  scene;

  spring = 0.06;
  friction = 0.85;
  mouseVelocity = new OGL.Vec3();
  mouseToFirstPoint = new OGL.Vec3();

  constructor(canvas) {
    this.canvas = canvas;
    this.setupRenderer();
    this.setupCamera();
    this.setupControls();
    this.setupScene();

    window.addEventListener('resize', this.onResize.bind(this));

    if ("ontouchstart" in window) {
      window.addEventListener("touchstart", this.onMouseMove.bind(this));
      window.addEventListener("touchmove", this.onMouseMove.bind(this));
    } else {
      window.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    this.tick();
  }

  setupRenderer = () => {
    this.renderer = new OGL.Renderer({
      canvas: this.canvas,
      dpr: 2,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.gl =this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
  }

  setupCamera = () => {
    this.camera = new OGL.Camera(this.gl);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });

    this.camera.position.z = 3;
  }

  setupControls = () => {
    this.controls = new OGL.Orbit(this.camera);
  }

  setupScene = () => {
    this.scene = new OGL.Transform();

    this.count = 40;
    this.points = [];
    for (let i = 0; i < this.count; i++) {
      const x = i / (this.count - 1) - 0.5;
      const y = 0;
      const z = 0;

      this.points.push(new OGL.Vec3(x, y, z));
    };

    this.polyline = new OGL.Polyline(this.gl, {
      points: this.points,
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uThickness: { value: 40 },
      },
    });
    
    this.polyline.mesh.setParent(this.scene);
  }

  tick = () => {
    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });

    // Update line points using mouse position and previously recorded points
    for (let i = this.points.length - 1; i >= 0; i--) {
      if (!i) {
        this.mouseToFirstPoint.copy(this.mouse).sub(this.points[i]).multiply(this.spring);
        this.mouseVelocity.add(this.mouseToFirstPoint).multiply(this.friction);
        this.points[i].add(this.mouseVelocity);
      } else {
        this.points[i].lerp(this.points[i - 1], 0.9);
      }
    }
    this.polyline.updateGeometry();

    this.controls.update();
    requestAnimationFrame(this.tick.bind(this));
  }

  onResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });

    if (this.polyline) this.polyline.resize();
  }

  onMouseMove = (e) => {
    if (e.changedTouches && e.changedTouches.length) {
      e.x = e.changedTouches[0].pageX;
      e.y = e.changedTouches[0].pageY;
    }
    if (e.x === undefined) {
      e.x = e.pageX;
      e.y = e.pageY;
    }

    // Get mouse value in -1 to 1 range, with y flipped
    this.mouse.set(
      (e.x / this.gl.renderer.width) * 2 - 1,
      (e.y / this.gl.renderer.height) * -2 + 1,
      0
    );
  }
}
