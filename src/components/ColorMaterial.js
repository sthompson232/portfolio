import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import glsl from "babel-plugin-glsl/macro"


const ColorMaterial = shaderMaterial(
    { 
        time: 1.0, 
        color: new THREE.Color(0.2, 0.0, 0.1), 
        color1: new THREE.Color(0.2, 0.0, 0.1),
        color2: new THREE.Color(0.2, 0.0, 0.1) 
    },
    glsl`varying vec2 vUv;
    varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      }`,
    glsl`uniform float time;
      uniform vec3 color;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec3 vNormal;
      varying vec2 vUv;
      void main() {
          float c0 = abs(dot(vNormal, vec3(1.0, 0.0, 0.0)));
          float c1 = abs(dot(vNormal, vec3(0.0, 1.0, 0.0)));
          float c2 = abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          vec3 finalColor = c0*color + c1*color1 + c2*color2;
        gl_FragColor.rgba = vec4(finalColor, 1.0);
      }`
  )
  
  extend({ ColorMaterial })