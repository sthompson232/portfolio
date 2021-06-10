import React from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import { Shape } from './Shape'
import { HeroText } from './HeroText'


export const Landing = ({ paletteNumber, paletteActive, colors, darkMode }) => {
    
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
            <HeroText 
                paletteNumber={paletteNumber}
                paletteActive={paletteActive}
                colors={colors}
                darkMode={darkMode}
            />
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
