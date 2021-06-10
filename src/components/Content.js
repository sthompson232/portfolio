import React from 'react'
import { useStyles } from '../styles'
import { Typography } from '@material-ui/core';


export const Content = ({ paletteNumber, paletteActive, colors, darkMode }) => {
    const classes = useStyles();

    return (
        <Typography 
        variant="h6" 
        className={darkMode ? 
            classes.white : 
            classes.black
        }>Full stack developer</Typography>
    )
}
