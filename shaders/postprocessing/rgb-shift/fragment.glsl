uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uVelocity;

varying vec2 vUv;

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
	uv -= disc_center;
	uv *= uResolution;
	float dist = sqrt(dot(uv, uv));
	return smoothstep(disc_radius + border_size, disc_radius - border_size, dist);
}

void main()	{
	vec2 uv = vUv;
	
	float c = circle(uv, uMouse, 0.0, 0.2);

	float r = texture2D(tDiffuse, uv += c * (uVelocity * 0.5)).x;
	float g = texture2D(tDiffuse, uv += c * (uVelocity * 0.525)).y;
	float b = texture2D(tDiffuse, uv += c * (uVelocity * 0.55)).z;
	float a = texture2D(tDiffuse, uv).a;

	gl_FragColor = vec4(r, g, b, a);
}
