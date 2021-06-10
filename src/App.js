import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, DepthOfField, Bloom } from '@react-three/postprocessing'
import { Html } from '@react-three/drei'
import { Loader } from './Loader'
import { Shape } from './Shape'
import "./ColorMaterial"
import { 
    Button, 
    Typography, 
    Switch,
    ThemeProvider, 
} from '@material-ui/core';
import { lightTheme, darkTheme } from './theme'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    imageBackground: {
        height: '100vh',
        backgroundImage: "url('../../static/frontend/images/backdrop.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover",
        [theme.breakpoints.up('sm')]: {
            backgroundPositionX: "75%",
            backgroundPositionY: "bottom"
        },
        [theme.breakpoints.down('sm')]: {
            backgroundPositionX: "50%",
            backgroundPositionY: "center"
        }
    },
    heroText: {
        fontSize: '7rem',
        fontWeight: 700,
        fontFamily: `'Poppins', sans-serif`
    }
}));


const App = () => {

    const [darkMode, setDarkMode] = useState(false)
    const [paletteNumber, setPaletteNumber] = useState(darkMode ? 36 : 11)
    const classes = useStyles();
    const [theme] = useState(darkMode ? darkTheme : lightTheme)

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
                }}
            >
                <Shape position={[0, 0, 0]} count={20} paletteNumber={paletteNumber}/>
                <Html center>
                    <Typography variant="h1" color="primary" className={classes.heroText}>Full stack developer</Typography>
                    <Switch 
                            checked={darkMode} 
                            onChange={() => {
                                setDarkMode(!darkMode) 
                                setPaletteNumber(darkMode ? 11 : 36)
                            }} 
                        />
                    <Button variant="contained" color="primary" size="large" onClick={() => setPaletteNumber(Math.floor(Math.random() * 100))}>New color</Button>
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
            <Loader />
            <Typography variant="h1" color="primary">Full stack developer</Typography>
        </ThemeProvider>
    )
}

export default App