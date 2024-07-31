uniform sampler2D uImage;
uniform float uScrollSpeed;
uniform float uIntensity;
varying vec2 vUv;

void main() {
	float scrollSpeed = uScrollSpeed * uIntensity;

  float angle = 1.55;
	// SCALE
  vec2 p = (vUv - vec2(0.5, 0.5)) * (1.0 - scrollSpeed) + vec2(0.5, 0.5);
	// RGB
  vec2 offset = scrollSpeed / 2.0 * vec2(cos(angle), sin(angle));

  float r = texture2D(uImage, p + offset).r;
  float g = texture2D(uImage, p).g;
  float b = texture2D(uImage, p - offset).b;
  float a = texture2D(uImage, p).a;

	gl_FragColor = vec4(r, g, b, a);
}
