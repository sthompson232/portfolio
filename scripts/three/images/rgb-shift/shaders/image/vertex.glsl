uniform float progress;
uniform vec4 resolution;
varying vec2 vUv;
uniform sampler2D texture1;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
