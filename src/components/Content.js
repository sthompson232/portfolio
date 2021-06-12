import { useEffect, useState } from 'react'
import { Typer } from './Typer'
import { Section } from './Section'
import { Icons } from './Icons'
import { Bio } from './Bio'
import { Box } from '@material-ui/core'
import { Website } from './Website'
import khalopsian from '../static/khal.png'
import bookguild from '../static/bookguild.png'
import conference from '../static/conference.png'
import roth from '../static/roth.png'


export const Content = ({ paletteNumber, paletteActive, colors, darkMode }) => {

    const [textColor, setTextColor] = useState('')
    const [color1, setColor1] = useState('')
    const [color2, setColor2] = useState('')
    const [color3, setColor3] = useState('')

    useEffect(() => {
        setTextColor(paletteActive ? (colors[paletteNumber][4]) : (darkMode ? '#ffffff' : '#0E0E0E'))
        setColor1(paletteActive ? (colors[paletteNumber][1]) : (darkMode ? '#0E0E0E' : '#ffffff'))
        setColor2(paletteActive ? (colors[paletteNumber][2]) : (darkMode ? '#0E0E0E' : '#ffffff'))
        setColor3(paletteActive ? (colors[paletteNumber][3]) : (darkMode ? '#0E0E0E' : '#ffffff'))
    }, [paletteActive, colors, paletteNumber, darkMode])

    return (
        <>

        <Section 
            background={paletteActive ? color1 : (darkMode ? '#0E0E0E' : '#ffffff')} 
            color={textColor} 
            content={
                <Typer
                    heading="I love to use"
                    dataText={[  
                    'three.js',
                    'react-fiber.',
                    'Redux.',
                    'GraphQL.',
                    'Celery.',
                    'Redis.',
                    'Git/Github.',
                    'Docker.',
                    'Bootstrap.',
                    'Material-UI.',
                    'TailwindCSS.',
                    'Alpine.js.',
                    'AJAX.',
                    'jQuery.',
                    'Adobe XD.',
                    'Photoshop.',
                    'Nginx.',
                    'gunicorn.'
                    ]} 
                    paletteNumber={paletteNumber}
                    paletteActive={paletteActive}
                    colors={colors}
                    darkMode={darkMode}
                    textColor={textColor}
                />
            }
        />
        <Section 
            background={paletteActive ? color2 : (darkMode ? '#0E0E0E' : '#ffffff')} 
            color={textColor} 
            content={'But you\'ll mostly find me using...'}
        />
        <Box py={6} style={paletteActive ? {backgroundColor: color3} : (darkMode ? {backgroundColor: '#0E0E0E'} : {backgroundColor: '#ffffff'})} >
            <Icons color={textColor} />
        </Box>
        <Section 
            background={paletteActive ? color1 : (darkMode ? '#0E0E0E' : '#ffffff')} 
            color={textColor} 
            content={'...in projects like these:'}
        />
        <Website 
            image={bookguild}
            title='The Bookguild Publishing'
            background={color2}
            color={textColor}
            link='https://www.bookguild.co.uk/'
        />
        <Website 
            image={khalopsian}
            title='Khalopsian'
            background={color3}
            color={textColor}
            link='https://www.khalopsian.com/'
        />
        <Website 
            image={conference}
            title='The Self-Publishing Conference'
            background={color1}
            color={textColor}
            link='https://www.selfpublishingconference.org.uk/'
        />
        <Website 
            image={roth}
            title='Lorna Roth'
            background={color2}
            color={textColor}
            link='https://www.lornarothauthor.co.uk/'
        />
        <Bio 
            background={paletteActive ? color3 : (darkMode ? '#0E0E0E' : '#ffffff')} 
            button={color2}
            color={textColor}
            color2={color1}
        />
        </>
    )
}
