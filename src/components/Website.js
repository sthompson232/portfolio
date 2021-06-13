import React from 'react'
import { Grid, Typography, Link } from '@material-ui/core'
import { useStyles } from '../styles'


export const Website = ({ image, title, background, color, link }) => {
    const classes = useStyles();

    return (
        <Grid className='websiteContainer'>
        <img style={{ width: '100%' }} src={image} alt={title} className='websiteImage' />
            <Link href={link} target="_blank" className='overlay' style={{ backgroundColor: background }}>
                <Typography 
                    variant="h1" 
                    className={`${classes.websiteText} text`}
                    style={{ color: color }}
                >
                    {title}
                </Typography>
            </Link>

        </Grid>
    )
}
