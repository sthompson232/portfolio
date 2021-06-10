import { useEffect, useState } from 'react'
import { useStyles } from '../styles'
import { Typography, Grid } from '@material-ui/core'
import { Typer } from './Typer'
import { DjangoIcon } from './helpers/DjangoIcon'
import { ReactIcon } from './helpers/ReactIcon'



export const Content = ({ paletteNumber, paletteActive, colors, darkMode }) => {
    const classes = useStyles();

    const [textColor, setTextColor] = useState('')

    useEffect(() => {
        setTextColor(paletteActive ? (colors[paletteNumber][4]) : (darkMode ? '#ffffff' : '#0E0E0E'))
    }, [paletteActive, colors, paletteNumber, darkMode])

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
        <Typography 
        variant="h1" 
        className={classes.headingText}
        style={{color:textColor}}>But my go to's are...</Typography>
        <Grid container>
            <Grid item xs={6}>
            <ReactIcon fill={textColor} />
            </Grid>
            <Grid item xs={6}>
            <DjangoIcon fill={textColor} />
            </Grid>
        </Grid>
        </>
    )
}
