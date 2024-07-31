varying vec2 vUv;
uniform vec2 uResolution;
uniform sampler2D uImage;

void main() {
  vec4 image = texture2D(uImage, vUv);

  gl_FragColor = image;
}