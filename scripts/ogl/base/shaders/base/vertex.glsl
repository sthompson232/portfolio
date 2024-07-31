attribute vec3 position;
attribute vec3 next;
attribute vec3 prev;
attribute vec2 uv;
attribute float side;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
