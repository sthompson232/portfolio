import * as THREE from 'three' 
import ReactDOM from 'react-dom'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import clamp from 'clamp'
import './index.css'
import "./ColorMaterial"

const colors = require('nice-color-palettes');

let palette = colors[96]

const easeInOutQuint = function(pos) {
  if ((pos/=0.5) < 1) return 0.5*Math.pow(pos, 5);
  return 0.5 * (Math.pow((pos-2),5) + 2);
}

const tempObject = new THREE.Object3D()

function Box({ count }) {

  const mesh = useRef()
  useFrame((state) => {

    const mouse = state.mouse

    let time = state.clock.getElapsedTime()%6
    let playhead = time/6
    let i = 0
    let number = count


    mesh.current.rotation.x = mouse.y * 0.01
    mesh.current.rotation.y = mouse.x * 0.01

    for (let x = 0; x <= number; x++)
      for (let z = 0; z <= number; z++) {
        let offset = Math.sqrt( (x/number - 0.5) **2 + (z/number - 0.5) **2 )/Math.sqrt(0.5**2 + 0.5**2)
        const id = i++
        let progress = easeInOutQuint(clamp((playhead - 0.4 * offset) /0.6, 0, 1))
        let sine = Math.sin(progress*Math.PI)
        const scale = 1
        
        tempObject.position.set(30*(x/number - 0.5) + (mouse.y * 0.1), offset * 1, 30*(z/number - 0.5) + (mouse.x * 0.1))
        tempObject.rotation.y = progress*Math.PI
        tempObject.scale.set(scale + 0.2*sine, scale + 0.1*sine, scale + 0.2*sine)
        tempObject.updateMatrix()
        mesh.current.setMatrixAt(id, tempObject.matrix)
      }
    mesh.current.instanceMatrix.needsUpdate = true
    
  })

  return (
    <instancedMesh
      ref={mesh}
      args={[null, null, 1000]}
      >
      <boxBufferGeometry args={[0.9, 10, 0.9]} />
      <colorMaterial 
        color={palette[1]} 
        color1={palette[2]} 
        color2={palette[3]} 
      />
    </instancedMesh>
  )
}

ReactDOM.render(
  <Canvas
  gl={{
    preserveDrawingBuffer: true,
  }}
  onCreated={({gl}) => {
    gl.setClearColor(palette[4])
  }}
  colorManagement
  camera={{
    position: [-6, 7, -3]
  }}>
    <ambientLight intensity={0.5}/>
    <Box position={[0, 0, 0]} count={20} />
    <EffectComposer>
      <DepthOfField
            target={[-6, 7, -3]}
            focalLength={0.03}
            bokehScale={10}
            height={500}
          />
      <ChromaticAberration offset={[-0.001, 0.004]} />
    </EffectComposer>
  </Canvas>,
  document.getElementById('root'),
)