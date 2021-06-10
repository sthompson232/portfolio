import React from 'react'
import { useStyles } from '../styles'
import { Typography } from '@material-ui/core';
import react from '../static/react.svg'
import django from '../static/django.svg'
import { Typer } from './Typer'

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
        <Typer
    heading="I love to use"
    dataText={[  
      'Django.', 
      'React.',
      'Three.js',
      'GraphQL.',
      'Redux.',
      'Celery.',
      'Redis.',
      'Bootstrap.',
      'Material-UI.',
      'Tailwind CSS.',
      'Alpine.js.',
      'React-Three-Fiber.'
    ]} 
  />
        </>
    )
}
