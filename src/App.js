import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, DepthOfField, Bloom } from '@react-three/postprocessing'
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
    responsiveFontSizes
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

}));


function App() {

    const classes = useStyles();
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

    theme = responsiveFontSizes(theme);
    return (
        <>
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
                // position: [-6, 7, -3],
                position: [-10.8, 7.6, -6],
                fov: 50,
                near: 1, 
            }}>
                <ambientLight intensity={0.5}/>
                <Shape position={[0, 0, 0]} count={20} paletteNumber={paletteNumber}/>
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
            <Loader />
            <ThemeProvider theme={theme}>
                <Paper>
                        <Switch 
                            checked={darkMode} 
                            onChange={() => {
                                setDarkMode(!darkMode) 
                                setPaletteNumber(darkMode ? 11 : 36)
                            }} 
                        />
                        <Typography variant="h1" className={classes.heroText} color="secondary">Full stack developer</Typography>
                        <Button variant="contained" color="primary" size="large" onClick={() => setPaletteNumber(Math.floor(Math.random() * 100) + 1)}>New color</Button>
                </Paper>
            </ThemeProvider>
        </>
    )
}

export default App