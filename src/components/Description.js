import React, { useRef, useEffect } from 'react'
import { Typography, Box, Grid, Link } from '@material-ui/core'
import { useStyles } from '../styles'
import cv from '../static/cv.pdf'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


export const Description = ({ color, color2, paletteActive }) => {
    const classes = useStyles();
    const bioRef = useRef(null)

    useEffect(() => {
        gsap.fromTo(bioRef.current, {
            x: -100,
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            duration: 2,
            x: 0,
            scrollTrigger: {
                trigger: bioRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
            }
        })
    }, [bioRef])

    return (
        <Grid item sm={12} lg={7} xl={8} xxl={10}>
            <Box p={4}>
                <div ref={bioRef}>
                    <Typography
                        variant="h1" 
                        className={classes.paraText}
                        style={{ color: color }}
                        >
                        I am a self taught web developer, currently working as a <span style={paletteActive ? {color: color2} : {color: color}}>freelancer,</span> primarily using  <span style={paletteActive ? {color: color2} : {color: color}}>Django</span> and  <span style={paletteActive ? {color: color2} : {color: color}}>React.</span> 
                        <br />
                        <br />
                        To find out more about me, you can read my CV <Link target="_blank" href={cv} style={{ color: color2, textDecoration: 'none' }}>here.</Link>
                    </Typography>
                </div>
            </Box>
        </Grid>
    )
}

