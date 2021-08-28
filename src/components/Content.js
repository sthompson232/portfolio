import { useEffect, useState } from 'react'
import { Typer } from './Typer'
import { Section } from './Section'
import { Bio } from './Bio'
import { useMediaQuery } from '@material-ui/core'
import { Website } from './Website'

import khalopsian from '../static/khal.png'
import bookguild from '../static/bookguild.png'
import conference from '../static/conference.png'
import evince from '../static/evince.png'
import yeonmi from '../static/yeonmi.png'
import budgetcog from '../static/budgetcog.png'

import khalopsianmob from '../static/khalmob.png'
import bookguildmob from '../static/bookguildmob.png'
import conferencemob from '../static/conferencemob.png'
import evincemob from '../static/evincemob.png'
import yeonmimob from '../static/yeonmimob.png'
import budgetcogmob from '../static/budgetcogmob.png'


export const Content = ({ paletteNumber, paletteActive, colors, darkMode }) => {
    const breakpoint = useMediaQuery('(min-width:600px)');

    const [textColor, setTextColor] = useState('')
    const [color1, setColor1] = useState('')
    const [color2, setColor2] = useState('')
    const [color3, setColor3] = useState('')

    const [revTextColor, setRevTextColor] = useState('')
    const [revColor2, setRevColor2] = useState('')

    useEffect(() => {
        setTextColor(paletteActive ? (colors[paletteNumber][4]) : (darkMode ? '#ffffff' : '#0E0E0E'))
        setColor1(paletteActive ? (colors[paletteNumber][1]) : (darkMode ? '#0E0E0E' : '#ffffff'))
        setColor2(paletteActive ? (colors[paletteNumber][2]) : (darkMode ? '#0E0E0E' : '#ffffff'))
        setColor3(paletteActive ? (colors[paletteNumber][3]) : (darkMode ? '#0E0E0E' : '#ffffff'))
        setRevTextColor(paletteActive ? (colors[paletteNumber][4]) : (darkMode ? '#0E0E0E' : '#ffffff'))
        setRevColor2(paletteActive ? (colors[paletteNumber][2]) : (darkMode ? '#ffffff' : '#0E0E0E'))
    }, [paletteActive, colors, paletteNumber, darkMode])

    return (
        <>

        <Section 
            background={paletteActive ? color1 : (darkMode ? '#0E0E0E' : '#ffffff')} 
            color={textColor} 
            content={
                <Typer
                    heading="and I love to use"
                    dataText={[ 
                    'Django',
                    'React', 
                    'three.js',
                    'react-fiber.',
                    'GSAP.',
                    'Redux.',
                    'GraphQL.',
                    'Celery.',
                    'Next.js.',
                    'Redis.',
                    'Git/Github.',
                    'Docker.',
                    'Bootstrap.',
                    'Material-UI.',
                    'Chakra UI',
                    'TailwindCSS.',
                    'Typescript',
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
            content={'...in projects like these:'}
        />
        <Website 
            image={breakpoint ? bookguild : bookguildmob}
            title='The Bookguild Publishing'
            background={color3}
            color={textColor}
            link='https://www.bookguild.co.uk/'
        />
        <Website 
            image={breakpoint ? evince : evincemob}
            title='Evince London'
            background={color2}
            color={textColor}
            link='https://www.evincelondon.com/'
        />
        <Website 
            image={breakpoint ? khalopsian : khalopsianmob}
            title='Khalopsian'
            background={color3}
            color={textColor}
            link='https://www.khalopsian.com/'
        />
        <Website 
            image={breakpoint ? conference : conferencemob}
            title='The Self-Publishing Conference'
            background={color1}
            color={textColor}
            link='https://www.selfpublishingconference.org.uk/'
        />
        <Website 
            image={breakpoint ? yeonmi : yeonmimob}
            title='Yeonmi Park'
            background={color2}
            color={textColor}
            link='https://www.yeonmi-park.com/'
        />
        <Bio 
            background={paletteActive ? color3 : (darkMode ? '#0E0E0E' : '#ffffff')} 
            button={color2}
            color={textColor}
            color2={color1}
            revButton={revColor2}
            revColor={revTextColor}
            paletteActive={paletteActive}
        />
        </>
    )
}
