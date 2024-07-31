uniform float uTime;
uniform vec2 uHover;
uniform float uHoverState;
varying float vDistanceFromHover;
varying vec2 vUv;

void main() {
  vec3 newPosition = position;
  float distanceFromHover = distance(uv, uHover);
  float distanceFromCenter = distance(uv, vec2(0.5));

  // Make images passively wave on hover
  // newPosition.z += uHoverState * 10.0;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  // Varyings
  vDistanceFromHover = distanceFromHover;
  vUv = uv;
}
