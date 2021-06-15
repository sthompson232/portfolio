import React from 'react'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Typography } from '@material-ui/core';
import { useStyles } from '../styles'


export const HeroText = ({ paletteNumber, paletteActive, colors, darkMode }) => {
    const { size } = useThree()
    const classes = useStyles()

    return (
        <Html
        zIndexRange={[1, 0]}
        style={{
            position: 'absolute',
            'pointer-events': 'none',
            top: -size.height / 5,
            left: -size.width / 2.4,
            width: size.width / 2,
            height: 0
          }}>
        <div>
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
        </div>
        </Html>
    )
}
