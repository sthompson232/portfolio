#include ./random.glsl

float addGrain(vec2 resolution, float time) {
  vec2 st = gl_FragCoord.xy / resolution.xy;
  // st += sin(uTime);
  float noise = random(st);

  float noiseBrightness = 0.9;
  float noiseIntensity = 0.05;

  float grain = (noise + noiseBrightness) * noiseIntensity; 

  return grain;
}
