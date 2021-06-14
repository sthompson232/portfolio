import React, { useEffect, useRef } from 'react'
import { Typography, Box } from '@material-ui/core'
import { useStyles } from '../styles'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Section = ({background, color, content}) => {
    const textRef = useRef(null)
    const classes = useStyles();

    useEffect(() => {

        gsap.fromTo(textRef.current, {
            autoAlpha: 0
        }, {
            duration: 1.5, 
            autoAlpha: 1, 
            ease: 'none',
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top bottom-=15%',
                end: 'bottom top',
                toggleActions: 'play none none reverse',
            }
        })

    }, [textRef])

    return (
        <Box
            py={20}
            style={{ backgroundColor: background, border: 'none' }}
        >
            <div ref={textRef}>
                <Typography
                    variant="h1" 
                    className={classes.headingText}
                    style={{ color: color }}
                    >
                    {content}
                </Typography>
            </div>
        </Box>
    )
}
