uniform float uScrollSpeed;
uniform float uIntensity;
varying vec2 vUv;

float pi = 3.1415926535897932384626433832795;

void main() {
  vec3 newPosition = position;
  newPosition.y += ((sin(uv.x * pi) * uScrollSpeed * 1.5) * 100.0);
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
