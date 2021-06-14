import React, { useEffect, useRef } from 'react'
import { Grid, Paper, Link } from '@material-ui/core'
import { useStyles } from '../styles'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const ContactButton = ({ icon, button, link }) => {
    const classes = useStyles();
    const buttonRef = useRef(null)

    useEffect(() => {
        gsap.fromTo(buttonRef.current, {
            autoAlpha: 0,
        }, {
            duration: 1, 
            autoAlpha: 1, 
            ease: 'none',
            scrollTrigger: {
                trigger: buttonRef.current,
                start: 'top bottom',
                end: '-=300',
                toggleActions: 'play none none reverse',
            }
        })
    }, [buttonRef])

    return (
        <Grid item xs={12} md={4}>
            <div ref={buttonRef}>
                <Link href={link} target="_blank">
                    <Paper className={`${classes.button} hover`} style={{ backgroundColor: button }}>
                        {icon}
                    </Paper>
                </Link>
            </div>
        </Grid>
    )
}

