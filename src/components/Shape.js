import * as THREE from 'three' 
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import clamp from 'clamp'
import "./ColorMaterial"


const tempObject = new THREE.Object3D()


export const Shape = ({ count, paletteNumber, colors }) => {

  const easeInOutQuint = function(pos) {
  if ((pos/=0.5) < 1) return 0.5*Math.pow(pos, 5);
  return 0.5 * (Math.pow((pos-2),5) + 2);
  }

  let palette = colors[paletteNumber]

  const mesh = useRef()

  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const mouse = state.mouse
    let time = state.clock.getElapsedTime()%5
    let playhead = time/5
    let i = 0
    let number = count

    mesh.current.rotation.x = -mouse.y * 0.02
    mesh.current.rotation.y = -mouse.x * 0.02

    for (let x = 0; x <= number; x++)
      for (let z = 0; z <= number; z++) {
        let offset = Math.sqrt( (x/number - 0.5) **2 + (z/number - 0.5) **2 )/Math.sqrt(0.5**2 + 0.5**2)
        const id = i++
        let progress = easeInOutQuint(clamp((playhead - 0.4 * offset) /0.6, 0, 1))
        let sine = Math.sin(progress*Math.PI)
        const scale = 1
        const hover = id === hovered ? 1.4 : 1

        tempObject.position.set(
            30*(x/number - 0.5) + (mouse.y * 0.1), 
            offset * 1 * hover, 
            30*(z/number - 0.5) + (mouse.x * 0.1)
        )
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
      onPointerMove={(e) => setHovered(e.instanceId)}
      onPointerOut={(e) => setHovered(undefined)}
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
