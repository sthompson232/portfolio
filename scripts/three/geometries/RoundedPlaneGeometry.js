// https://discourse.threejs.org/t/three-js-video-with-rounded-corners/28543/13
import { BufferGeometry, BufferAttribute } from 'three';

export default class RoundedPlaneGeometry extends BufferGeometry {
  width;
  height;
  borderRadius;
  segments;

  indices = [];
  positions = [];
  uvs = [];

  constructor(width, height, borderRadius, smoothness) {
    super();
    this.width = width;
    this.height = height;
    this.borderRadius = borderRadius;
    this.segments = (smoothness + 1) * 4; // number of segments    

    for (let j = 1; j < this.segments; j++) {
      this.indices.push(0, j, j + 1); // 0 is center
    }
    this.indices.push(0, this.segments, 1);   
    this.positions.push( 0, 0, 0 ); // rectangle center
    this.uvs.push(0.5, 0.5);   
    for (let j = 0; j < this.segments; j++) {
      this.contour(j);
    }
    
    this.setIndex(new BufferAttribute(new Uint32Array(this.indices), 1));
    this.setAttribute('position', new BufferAttribute(new Float32Array(this.positions), 3));
    this.setAttribute('uv', new BufferAttribute(new Float32Array(this.uvs), 2));
  }

  contour(j) {
    const pi2 = Math.PI * 2;
    const qu = Math.trunc(4 * j / this.segments) + 1; // quadrant  qu: 1..4         
    const sgx = (qu === 1 || qu === 4 ? 1 : -1)  // signum left/right
    const sgy = qu < 3 ? 1 : -1;                 // signum  top / bottom
    
    const x = sgx * (this.width / 2 - this.borderRadius) + this.borderRadius * Math.cos(pi2 * (j - qu + 1) / (this.segments - 4)); // corner center + circle
    const y = sgy * (this.height / 2 - this.borderRadius) + this.borderRadius * Math.sin(pi2 * (j - qu + 1) / (this.segments - 4));   

    this.positions.push(x, y, 0 );
    this.uvs.push( 0.5 + x / this.width, 0.5 + y / this.height);
  }
}
