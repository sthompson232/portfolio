import React from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import { Html } from '@react-three/drei'
import { Shape } from './Shape'
import "./ColorMaterial"
import { 
    Typography, 
} from '@material-ui/core';
import { useStyles } from '../styles'

export const Landing = ({ paletteNumber, paletteActive, colors, darkMode }) => {
    const classes = useStyles();
    
    return (
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
                    <Typography 
                    variant="h1" 
                    style={{ color: colors[paletteNumber][4]}}
                    className={classes.heroText}
                    >
                        Hi, I'm a London-based full stack developer...
                    </Typography>
                :
                    <Typography 
                        variant="h1" 
                        className={`${darkMode 
                            ? classes.white
                            : classes.black} ${classes.heroText}`}
                    >
                        Hi, I'm a London-based full stack developer...
                    </Typography>
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
    )
}
