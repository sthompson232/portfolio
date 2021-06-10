import React, { useState, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, DepthOfField, Bloom } from '@react-three/postprocessing'
import { Html } from '@react-three/drei'
import { Loader } from './Loader'
import { Shape } from './Shape'
import "./ColorMaterial"
import { 
    Button, 
    Typography, 
    Switch,
    Paper, 
    ThemeProvider, 
    createMuiTheme, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({

// }));


function HtmlContent({ className, style, children, portal }) {
    const { size } = useThree()
    return (
      <Html
        portal={portal}
        style={{
          position: 'absolute',
          top: -size.height / 2,
          left: -size.width / 2,
          width: size.width,
          height: size.height
        }}>
        <div className={className} style={style}>
          {children}
        </div>
      </Html>
    )
  }



function App() {

    const domContent = useRef()
    const [darkMode, setDarkMode] = useState(false)
    const [paletteNumber, setPaletteNumber] = useState(darkMode ? 36 : 11)

    console.log(paletteNumber)

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

    return (
        <ThemeProvider theme={theme}>
            <Canvas
            gl={{
                preserveDrawingBuffer: true,
                alpha: false, 
                antialias: true
            }}
            onCreated={({gl}) => {
                gl.setClearColor(paletteNumber[4])
            }}
            colorManagement={true}
            camera={{
                position: [-10.8, 7.6, -6],
                fov: 50,
                near: 1, 
            }}>
                <ambientLight intensity={0.5}/>
                <Shape position={[0, 0, 0]} count={20} paletteNumber={paletteNumber}/>
                <Html center>
                    <Typography variant="h1">Full stack developer</Typography>
                    <Switch 
                            checked={darkMode} 
                            onChange={() => {
                                setDarkMode(!darkMode) 
                                setPaletteNumber(darkMode ? 11 : 36)
                            }} 
                        />
                    <Button variant="contained" color="primary" size="large" onClick={() => setPaletteNumber(Math.floor(Math.random() * 100) + 1)}>New color</Button>
                </Html>
                <EffectComposer>
                    <DepthOfField
                        target={[-6, 7, -3]}
                        focalLength={0.02}
                        bokehScale={10}
                        height={500}
                    />
                    <ChromaticAberration offset={[-0.001, 0.002]} />
                    <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={100} />
                </EffectComposer>
            </Canvas>
            <Paper>
                <Loader />
                <Typography variant="h1">HELLO HELLO EXTYR ACONTENT </Typography>
            </Paper>
        </ThemeProvider>

    )
}

export default App