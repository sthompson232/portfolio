import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, DepthOfField, Bloom } from '@react-three/postprocessing'
import { Html } from '@react-three/drei'
import { Loader } from './Loader'
import { Shape } from './Shape'
import "./ColorMaterial"
import { 
    Typography, 
    Paper,
    ThemeProvider, 
    IconButton
} from '@material-ui/core';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import PaletteIcon from '@material-ui/icons/Palette';
import { lightTheme, darkTheme } from './theme'
import { useStyles } from './styles'



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
                    <Typography 
                        variant="h1" 
                        className={darkMode 
                            ? classes.darkPrimary 
                            : classes.lightPrimary}
                    >
                        Full stack developer
                    </Typography>
                    <IconButton 
                    onClick={() => {
                        setDarkMode(!darkMode) 
                        setPaletteNumber(darkMode ? 11 : 36)
                    }} >
                        {!darkMode ? 
                        <Brightness2OutlinedIcon style={{ fontSize: 50, color: '#000000' }} /> : 
                        <Brightness7Icon style={{ fontSize: 50, color: '#ffffff' }}
                        />}
                    </IconButton>
                    <IconButton
                        onClick={() => 
                            setPaletteNumber(Math.floor(Math.random() * 100))}
                    >
                        <PaletteIcon style={{ fontSize: 50, color: '#000000' }} />
                    </IconButton>
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
            <Paper 
                className={darkMode ? 
                classes.backgroundDark :
                classes.backgroundLight
            }>
                <Typography 
                    variant="h1" 
                    className={darkMode ? 
                        classes.darkPrimary : 
                        classes.lightPrimary
                    }>Full stack developer</Typography>
            </Paper>

        </ThemeProvider>
    )
}

export default App