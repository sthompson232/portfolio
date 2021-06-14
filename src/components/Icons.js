import React, { useRef, useEffect } from 'react'
import { DjangoIcon } from './helpers/DjangoIcon'
import { ReactIcon } from './helpers/ReactIcon'
import { PostgresIcon } from './helpers/PostgresIcon'
import { Grid, Box } from '@material-ui/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


export const Icons = ( {color} ) => {

    const postgresRef = useRef(null)
    const djangoRef = useRef(null)
    const reactRef = useRef(null)

    useEffect(() => {
        const from = {
            autoAlpha: 0,
            y: 50
        }
        gsap.fromTo(postgresRef.current, from, {
            y: 0,
            duration: 1.5, 
            autoAlpha: 1,
            ease: 'bounce',
            scrollTrigger: {
                trigger: postgresRef.current,
                start: 'top bottom-=15%',
                toggleActions: 'play none none reverse',
            }
        })
        gsap.fromTo(djangoRef.current, from, {
            y: 0,
            duration: 1.5, 
            autoAlpha: 1,
            ease: 'bounce',
            delay: 0.5,
            scrollTrigger: {
                trigger: djangoRef.current,
                start: 'top bottom-=200',
                toggleActions: 'play none none reverse',
            }
        })
        gsap.fromTo(reactRef.current, from, {
            y: 0,
            duration: 1.5, 
            autoAlpha: 1,
            ease: 'bounce',
            delay: 1,
            scrollTrigger: {
                trigger: reactRef.current,
                start: 'top bottom-=200',
                toggleActions: 'play none none reverse',
            }
        })
    }, [postgresRef])

    return (
    <Grid alignContent='space-around' container>
            <Grid item align='center' xs={12} sm={4}>
                <Box className='icon' p={3}>
                    <div ref={postgresRef}>
                        <PostgresIcon fill={color} />
                    </div>
                </Box>
            </Grid>
            <Grid item align='center' xs={12} sm={4}>
                <Box className='icon' p={3}>
                    <div ref={djangoRef}>
                        <DjangoIcon fill={color} />
                    </div>
                </Box>
            </Grid>
            <Grid item align='center' xs={12} sm={4}>
                <Box className='icon' p={3}>
                    <div ref={reactRef}>
                        <ReactIcon fill={color} />
                    </div>
                </Box>
            </Grid>
    </Grid>
    )
}
