import { useEffect, useState } from 'react'
import { useStyles } from '../styles'
import { Typography } from '@material-ui/core'
import react from '../static/react.svg'
import django from '../static/django.svg'
import { Typer } from './Typer'

export const Content = ({ paletteNumber, paletteActive, colors, darkMode }) => {
    const classes = useStyles();

    const [textColor, setTextColor] = useState('')

    useEffect(() => {
        setTextColor(paletteActive ? (colors[paletteNumber][4]) : (darkMode ? '#077000' : '#ff000f'))
    })

    return (
        <>
        <Typer
            heading="I love to use"
            dataText={[  
            'PostgreSQL.',
            'three.js',
            'react-fiber.',
            'Redux.',
            'GraphQL.',
            'Celery.',
            'Redis.',
            'Git/Github.',
            'Bootstrap.',
            'Material-UI.',
            'TailwindCSS.',
            'Alpine.js.',
            ]} 
            paletteNumber={paletteNumber}
            paletteActive={paletteActive}
            colors={colors}
            darkMode={darkMode}
            textColor={textColor}
        />
        <img src={react} className="logo" alt="react logo" />
        <img src={django} className="logo" alt="django logo" />
        <Typography 
        variant="h6" 
        className={darkMode ? 
            classes.white : 
            classes.black
        }>Full stack developer</Typography>

        </>
    )
}
