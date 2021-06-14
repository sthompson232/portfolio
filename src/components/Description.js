import React, { useRef, useEffect } from 'react'
import { Typography, Box, Grid, Link } from '@material-ui/core'
import { useStyles } from '../styles'
import cv from '../static/cv.pdf'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


export const Description = ({ color, color2 }) => {
    const classes = useStyles();

    return (
        <Grid item sm={12} lg={7} xl={8} xxl={10}>
        <Box p={4}>
        {/* <Typography
            variant="h1" 
            className={classes.paraText}
            style={{ color: color }}
            >
            I am a self taught web developer, currently working as a <span style={{ color: color2 }}>freelancer,</span> primarily using Django and React. 
            <br />
            <br />
            To find out more about me, you can read my CV <Link target="_blank" href={cv} style={{ color: color2, textDecoration: 'none' }}>here.</Link>
        </Typography> */}
            <Typography
                variant="h1" 
                className={classes.paraText}
                style={{ color: color }}
                >
                I am a self taught web developer,
            </Typography>
            <Typography
                variant="h1" 
                className={classes.paraText}
                style={{ color: color }}
                >
                currently working as a <span style={{ color: color2 }}>freelancer,</span>
            </Typography>
            <Typography
                variant="h1" 
                className={classes.paraText}
                style={{ color: color }}
                >
                primarily using Django and React. 
            </Typography>
            <br /> 
            <br />
            <Typography
                variant="h1" 
                className={classes.paraText}
                style={{ color: color }}
                >
                To find out more about me,
            </Typography>
            <Typography
                variant="h1" 
                className={classes.paraText}
                style={{ color: color }}
                >
                you can read my CV <Link target="_blank" href={cv} style={{ color: color2, textDecoration: 'none' }}>here.</Link>
            </Typography>
        </Box>
    </Grid>
    )
}

