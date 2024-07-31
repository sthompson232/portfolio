attribute vec3 position;
attribute vec3 next;
attribute vec3 prev;
attribute vec2 uv;
attribute float side;

uniform vec2 uResolution;
uniform float uDPR;
uniform float uThickness;

void main() {
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1);

  // Ensure the next and previous vertices are configured for aspect ratio
  vec2 nextScreen = next.xy * aspect;
  vec2 prevScreen = prev.xy * aspect;

  // Find the normal of the current vertex so we can form the line
  vec2 tangent = normalize(nextScreen - prevScreen);
  vec2 normal = vec2(-tangent.y, tangent.x);
  normal /= aspect;

  // Controls shape of the line
  normal *= 1.0 - pow(abs(uv.y - 0.5) * 2.0, 2.0);

  float pixelWidth = 1.0 / (uResolution.y / uDPR);
  normal *= pixelWidth * uThickness;

  // When the points are on top of each other, shrink the line to avoid artifacts.
  float dist = length(nextScreen - prevScreen);
  normal *= smoothstep(0.0, 0.02, dist);

  vec4 newPosition = vec4(position, 1);
  newPosition.xy -= normal * side;

  gl_Position = newPosition;
}
