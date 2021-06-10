import React from 'react'
import { useStyles } from '../styles'
import { Typography } from '@material-ui/core';
import react from '../static/react.svg'
import django from '../static/django.svg'


export const Content = ({ paletteNumber, paletteActive, colors, darkMode }) => {
    const classes = useStyles();

    return (
        <>
        <img src={react} className="App-logo" alt="logo" />
        <img src={django} className="App-logo" alt="logo" />
        <Typography 
        variant="h6" 
        className={darkMode ? 
            classes.white : 
            classes.black
        }>Full stack developer</Typography>
        </>
    )
}
