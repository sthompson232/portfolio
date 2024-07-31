uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform float uScrollSpeed;
uniform float uTime;

void main() {
	vec2 newUV = vUv;
	float scrollDistortionIntensity = 0.3;
	float scrollSpeedDistortionArea = smoothstep(0.4, 0.0, vUv.y);
	scrollSpeedDistortionArea = pow(scrollSpeedDistortionArea, 4.0);
	newUV.x -= (vUv.x - 0.5) * scrollDistortionIntensity * scrollSpeedDistortionArea * uScrollSpeed;
	gl_FragColor = texture2D(tDiffuse, newUV);
}
