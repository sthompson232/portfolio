import * as THREE from 'three' 
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import clamp from 'clamp'
import "./ColorMaterial"
import { 
    Button, 
    Typography, 
    Switch,
    Paper, 
    ThemeProvider, 
    createMuiTheme, 
    responsiveFontSizes
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    heroText: {
        fontSize: 200,
        fontWeight: 700
    },
}));

const colors = require('nice-color-palettes');

let palette = colors[96]

const easeInOutQuint = function(pos) {
  if ((pos/=0.5) < 1) return 0.5*Math.pow(pos, 5);
  return 0.5 * (Math.pow((pos-2),5) + 2);
}

const tempObject = new THREE.Object3D()



function Shape({ count }) {
  const mesh = useRef()
  const prevRef = useRef()

  const [hovered, setHovered] = useState(false)

  useEffect(() => void (prevRef.current = hovered), [hovered])

  useFrame((state) => {
    const mouse = state.mouse
    let time = state.clock.getElapsedTime()%5
    let playhead = time/5
    let i = 0
    let number = count

    mesh.current.rotation.x = mouse.y * 0.02
    mesh.current.rotation.y = mouse.x * 0.02

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



function App() {
    const classes = useStyles();
    const [darkMode, setDarkMode] = useState(false)

    let theme = createMuiTheme({
    palette: {
        type: darkMode ? "dark" : "light",
        primary: {
        main: "#000000"
        },
        secondary: {
        main: "#ffffff",
        },
        white: {
        main: "#ffffff",
        },
    },
    typography: {
    "fontFamily": `'Poppins', sans-serif`,
    "fontSize": 15,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
    },
    spacing: 8,
    });

    theme = responsiveFontSizes(theme);
    return (
        <>
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
                <Shape position={[0, 0, 0]} count={20} />
                <EffectComposer>
                <DepthOfField
                        target={[-6, 7, -3]}
                        focalLength={0.03}
                        bokehScale={10}
                        height={500}
                    />
                <ChromaticAberration offset={[-0.001, 0.004]} />
                </EffectComposer>
            </Canvas>
            <ThemeProvider theme={theme}>
                <Paper>
                    <main>
                        <Typography variant="h1" className={classes.heroText} color="secondary">Full stack developer</Typography>
                    </main>
                    <div>
                        <Typography>This is my portfolio</Typography>
                        <Button variant="contained" color="primary" size="large">Register</Button>
                        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    </div>
                </Paper>
            </ThemeProvider>
        </>
    )
}

export default App