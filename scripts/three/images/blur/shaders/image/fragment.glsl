varying float vDistanceFromHover;
varying vec2 vUv;
uniform vec2 uResolution;
uniform sampler2D uImage;
uniform float uTime;
uniform float uHoverState;
uniform float uScrollSpeed;

// A potentially better blur
// https://github.com/JorgeCapillo/webgl-progressive-blur/blob/main/src/shaders/fragment.glsl

// Taken from three's VerticalBlurShader.js
vec4 verticalBlur(sampler2D image, vec2 uv, vec2 uResolution, float intensity) {
	vec4 sum = vec4(0.0);
  float v = intensity / uResolution.y;

	sum += texture2D( image, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
	sum += texture2D( image, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
	sum += texture2D( image, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
	sum += texture2D( image, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
	sum += texture2D( image, vec2( vUv.x, vUv.y ) ) * 0.1633;
	sum += texture2D( image, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
	sum += texture2D( image, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
	sum += texture2D( image, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
	sum += texture2D( image, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

	return sum;
}

// Taken from three's HorizontalBlurShader.js
vec4 horizontalBlur(sampler2D image, vec2 uv, vec2 uResolution, float intensity) {
	vec4 sum = vec4(0.0);
  float h = intensity / uResolution.x;

	sum += texture2D( image, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
	sum += texture2D( image, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
	sum += texture2D( image, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
	sum += texture2D( image, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
	sum += texture2D( image, vec2( vUv.x, vUv.y ) ) * 0.1633;
	sum += texture2D( image, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
	sum += texture2D( image, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
	sum += texture2D( image, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
	sum += texture2D( image, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

	return sum;
}

void main() {
  vec4 image = texture2D(uImage, vUv);

  // Apply horizontal blur based on uHoverState
  vec4 horizontalBlurredImage = horizontalBlur(uImage, vUv, uResolution, uHoverState * 3.0);

  // Apply vertical blur based on uScrollSpeed
  vec4 verticalBlurredImage = verticalBlur(uImage, vUv, uResolution, uScrollSpeed * 10.0);

  gl_FragColor = mix(horizontalBlurredImage, verticalBlurredImage, clamp(uScrollSpeed * 5.0, 0.0, 1.0));
}