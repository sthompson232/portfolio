uniform vec2 uMouse;
uniform vec2 uThreshold;
uniform sampler2D uImage;
uniform sampler2D uDepthMap;
varying vec2 vUv;

vec2 mirrored(vec2 v) {
  vec2 m = mod(v, 2.0);
  return mix(m, 2.0 - m, step(1.0, m));
}

void main() {
  vec4 depthTexture = texture2D(uDepthMap, mirrored(vUv));
  vec2 fake3d = vec2(
		vUv.x + (depthTexture.r - 0.5) * uMouse.x / uThreshold.x,
		vUv.y + (depthTexture.r - 0.5) * uMouse.y / uThreshold.y
	);
  gl_FragColor = texture2D(uImage, mirrored(fake3d));
}
