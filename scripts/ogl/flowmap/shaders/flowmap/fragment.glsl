precision highp float;

uniform sampler2D uImage;
uniform sampler2D tFlow;
uniform float uTime;
uniform vec2 uScreenSize;
uniform vec2 uImageSize;
uniform float uFlowmapStrength;

varying vec2 vUv;

void main() {
    // R and G values are velocity in the x and y direction, B value is the velocity length
    vec3 flow = texture2D(tFlow, vUv).rgb;

    // Ensure UV is always square and contained in the viewport
    float iconSize = min(uScreenSize.x, uScreenSize.y);
    
    vec2 uv = vUv;
    // Ensure UV is centered in the screen
    if (uScreenSize.x > uScreenSize.y) {
        // Vertically stretch the uv to keep it square
        float adjustmentHeight = uScreenSize.y / uScreenSize.x;
        uv.y *= adjustmentHeight;
        // Vertically center the uv
        float verticalOffset = (1.0 - adjustmentHeight) / 2.0;
        uv.y += verticalOffset;
    } else {
        uv *= (uScreenSize / iconSize);
        float adjustmentHeight = (uScreenSize.y - iconSize) / 2.0;
        uv.y -= adjustmentHeight / uScreenSize.x;
    }

    // Water effect and grid effect
    uv -= (flow.xy * uFlowmapStrength);

    vec3 textureColor = texture2D(uImage, uv).rgb;
    gl_FragColor = vec4(textureColor, 1.0);
}
