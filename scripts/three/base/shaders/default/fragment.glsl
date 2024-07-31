uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec2 uv = vUv;
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  vec3 normal = normalize(vNormal);
  vec3 color = vec3(1.0, uv);

  gl_FragColor = vec4(color, 1.0);
}
