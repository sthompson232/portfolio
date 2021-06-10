import React, { useEffect, useState } from 'react'
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

    const colors = require('nice-color-palettes');
    const classes = useStyles();

    useEffect(() => {
        console.log(colors[paletteNumber][4])    
    })

    const [darkMode, setDarkMode] = useState(false)
    const [paletteActive, setPaletteActive] = useState(false)
    const [paletteNumber, setPaletteNumber] = useState(darkMode ? 36 : 11)
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
                <Shape position={[0, 0, 0]} count={20} paletteNumber={paletteNumber} colors={colors}/>
                <Html center>
                    {paletteActive ? 
                        <div>
                            <Typography 
                            variant="h1" 
                            style={{ color: colors[paletteNumber][4]}}
                            className={classes.heroText}
                            >
                                Hi, I'm a London-based full stack developer...
                            </Typography>
                            <IconButton 
                                onClick={() => {
                                    setDarkMode(!darkMode) 
                                    setPaletteActive(false)
                                    setPaletteNumber(darkMode ? 11 : 36)
                                }} 
                            >
                            {!darkMode ? 
                            <Brightness2OutlinedIcon style={{ fontSize: 50, color: colors[paletteNumber][4] }} /> : 
                            <Brightness7Icon style={{ fontSize: 50, color: colors[paletteNumber][4] }} />
                            }
                            </IconButton>
                            <IconButton
                                onClick={() => { 
                                    setPaletteNumber(Math.floor(Math.random() * 100))
                                    setPaletteActive(true)
                                }}
                            >
                                <PaletteIcon style={{ fontSize: 50, color: colors[paletteNumber][4] }} /> 
                            </IconButton>
                        </div>

                    :

                        <div>
                            <Typography 
                                variant="h1" 
                                className={`${darkMode 
                                    ? classes.white
                                    : classes.black} ${classes.heroText}`}
                            >
                                Hi, I'm a London-based full stack developer...
                            </Typography>
                            <IconButton 
                                onClick={() => {
                                    setDarkMode(!darkMode) 
                                    setPaletteActive(false)
                                    setPaletteNumber(darkMode ? 11 : 36)
                                }} 
                            >
                            {!darkMode ? 
                            <Brightness2OutlinedIcon className={classes.black} style={{ fontSize: 50 }} /> : 
                            <Brightness7Icon className={classes.white} style={{ fontSize: 50 }} />
                            }
                            </IconButton>
                            <IconButton
                                onClick={() => { 
                                    setPaletteNumber(Math.floor(Math.random() * 100))
                                    setPaletteActive(true)
                                }}
                            >
                                {darkMode ? 
                                <PaletteIcon className={classes.white} style={{ fontSize: 50 }} /> : 
                                <PaletteIcon  className={classes.black} style={{ fontSize: 50 }} />
                                }
                            </IconButton>
                        </div>
                    }
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
                classes.backgroundBlack :
                classes.backgroundWhite
            }>
                <Typography 
                    variant="h1" 
                    className={darkMode ? 
                        classes.white : 
                        classes.black
                    }>Full stack developer</Typography>
            </Paper>

        </ThemeProvider>
    )
}

export default App