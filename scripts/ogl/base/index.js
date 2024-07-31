import * as OGL from 'ogl';
// Shaders
import vertexShader from '@/scripts/ogl/base/shaders/base/vertex.glsl';
import fragmentShader from '@/scripts/ogl/base/shaders/base/fragment.glsl';

export default class OGLScene {
  canvas;
  renderer;
  gl;
  camera;
  controls;
  scene;

  constructor(canvas) {
    this.canvas = canvas;
    this.setupRenderer();
    this.setupCamera();
    this.setupControls();
    this.setupScene();

    window.addEventListener("resize", this.onResize.bind(this), false);

    this.tick();
  }

  setupRenderer = () => {
    this.renderer = new OGL.Renderer({
      canvas: this.canvas,
      dpr: 2,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.gl =this.renderer.gl;
  }

  setupCamera = () => {
    this.camera = new OGL.Camera(this.gl);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });
    
    this.camera.position.z = 5;
  }

  setupControls = () => {
    this.controls = new OGL.Orbit(this.camera);
  }

  setupScene = () => {
    this.scene = new OGL.Transform();

    this.geometry = new OGL.Box(this.gl);

    this.program = new OGL.Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
    });

    this.mesh = new OGL.Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.mesh.setParent(this.scene);
  }

  tick = () => {
    this.mesh.rotation.y -= 0.04;
    this.mesh.rotation.x += 0.03;
    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });

    this.controls.update();
    requestAnimationFrame(this.tick.bind(this));
  }

  onResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height
    });
  }
}
