import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import { Html } from '@react-three/drei'
import { Loader } from './Loader'
import { Shape } from './Shape'
import { Navbar } from './Navbar'
import "./ColorMaterial"
import { 
    Typography, 
    Paper,
    ThemeProvider, 
    IconButton,
} from '@material-ui/core';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import PaletteIcon from '@material-ui/icons/Palette';
import { theme } from './theme'
import { useStyles } from './styles'



function Header({ children, sticky=false, className, ...rest }){
    const [isSticky, setIsSticky] = useState(false)
    const ref = React.createRef()
    
    // mount 
    useEffect(()=>{
      const cachedRef = ref.current,
            observer = new IntersectionObserver(
              ([e]) => setIsSticky(e.intersectionRatio < 1),
              {threshold: [1]}
            )
  
      observer.observe(cachedRef)
      
      // unmount
      return function(){
        observer.unobserve(cachedRef)
      }
    }, [])
    
    return (
        <header style={{ top: '-100' }} className={className + (isSticky ? " isSticky" : "")} ref={ref} {...rest}>
            {children}
        </header>
    )
  }



const App = () => {

    const colors = require('nice-color-palettes');
    const classes = useStyles();
    const startPalette = [8, 17, 30, 31, 38, 45, 50, 52, 62, 75, 83, 85, 89] 

    const [darkMode, setDarkMode] = useState(false)
    const [paletteActive, setPaletteActive] = useState(true)
    const [paletteNumber, setPaletteNumber] = useState(paletteActive ? 
                                                        startPalette[Math.floor(Math.random() * startPalette.length)] : 
                                                        (darkMode ? 36 : 11)
                                                        )

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
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
                            <Brightness2OutlinedIcon style={{ fontSize: 60, color: colors[paletteNumber][4] }} /> : 
                            <Brightness7Icon style={{ fontSize: 60, color: colors[paletteNumber][4] }} />
                            }
                            </IconButton>
                            <IconButton
                                onClick={() => { 
                                    setPaletteNumber(Math.floor(Math.random() * 100))
                                    setPaletteActive(true)
                                }}
                            >
                                <PaletteIcon style={{ fontSize: 60, color: colors[paletteNumber][4] }} /> 
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
                            <Brightness2OutlinedIcon className={classes.black} style={{ fontSize: 60 }} /> : 
                            <Brightness7Icon className={classes.white} style={{ fontSize: 60 }} />
                            }
                            </IconButton>
                            <IconButton
                                onClick={() => { 
                                    setPaletteNumber(Math.floor(Math.random() * 100))
                                    setPaletteActive(true)
                                }}
                            >
                                {darkMode ? 
                                <PaletteIcon className={classes.white} style={{ fontSize: 60 }} /> : 
                                <PaletteIcon  className={classes.black} style={{ fontSize: 60 }} />
                                }
                            </IconButton>
                        </div>
                    }
                </Html>
                <EffectComposer>
                    <DepthOfField
                        target={[-8, 8, -4]}
                        focalLength={0.02}
                        bokehScale={10}
                        height={500}
                    />
                    <ChromaticAberration offset={[-0.001, 0.002]} />
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