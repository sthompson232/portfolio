import React, { useState, useEffect } from 'react'
import { Loader } from './components/Loader'
import { Landing } from './components/Landing'
import { Content } from './components/Content'
import "./components/ColorMaterial"
import { 
    ThemeProvider, 
    IconButton,
    AppBar,
    Toolbar,
    Grid
} from '@material-ui/core';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import PaletteIcon from '@material-ui/icons/Palette';
import { theme } from './theme'
import { useStyles } from './styles'
import ReactGA from 'react-ga'


const App = () => {

    useEffect(() => {
        ReactGA.initialize('G-7PS9Y8WS07')
    }, [])

    const colors = require('nice-color-palettes');
    const classes = useStyles();
    const startPalette = [31, 30, 38, 75, 85, 83, 89] 
    const [darkMode, setDarkMode] = useState(true)
    const [paletteActive, setPaletteActive] = useState(true)
    const [paletteNumber, setPaletteNumber] = useState(paletteActive ? 
                                                        startPalette[Math.floor(Math.random() * startPalette.length)] : 
                                                        (darkMode ? 36 : 11)
                                                        )

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed">
                <Toolbar style={paletteActive ? {backgroundColor: '#0E0E0E'} : (darkMode ? {backgroundColor: '#0E0E0E'} : {backgroundColor: '#ffffff'})}>
                    <Grid justify="flex-end" alignItems="center" container>
                        <Grid item>
                            {paletteActive ? 
                                <div>
                                    <IconButton 
                                        style={{ margin: '0 20px'}}
                                        onClick={() => {
                                            setDarkMode(!darkMode) 
                                            setPaletteActive(false)
                                            setPaletteNumber(darkMode ? 11 : 36)
                                        }} 
                                    >
                                    {!darkMode ? 
                                    <Brightness2OutlinedIcon style={{ fontSize: 50, color: colors[paletteNumber][4] }} /> : 
                                    <Brightness7Icon style={{ fontSize: 50, color: colors[paletteNumber][4] }} />
                                    }
                                    </IconButton>
                                    <IconButton
                                        onClick={() => { 
                                            setPaletteNumber(Math.floor(Math.random() * 100))
                                            setPaletteActive(true)
                                        }}
                                    >
                                        <PaletteIcon style={{ fontSize: 50, color: colors[paletteNumber][4] }} /> 
                                    </IconButton>
                                </div>
                                :
                                <div>
                                    <IconButton 
                                        style={{ margin: '0 20px'}}
                                        onClick={() => {
                                            setDarkMode(!darkMode) 
                                            setPaletteActive(false)
                                            setPaletteNumber(darkMode ? 11 : 36)
                                        }} 
                                    >
                                    {!darkMode ? 
                                    <Brightness2OutlinedIcon className={classes.black} style={{ fontSize: 50 }} /> : 
                                    <Brightness7Icon className={classes.white} style={{ fontSize: 50 }} />
                                    }
                                    </IconButton>
                                    <IconButton
                                        onClick={() => { 
                                            setPaletteNumber(Math.floor(Math.random() * 100))
                                            setPaletteActive(true)
                                        }}
                                    >
                                        {darkMode ? 
                                        <PaletteIcon className={classes.white} style={{ fontSize: 50 }} /> : 
                                        <PaletteIcon  className={classes.black} style={{ fontSize: 50 }} />
                                        }
                                    </IconButton>
                                </div>
                                }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Landing 
                paletteNumber={paletteNumber}
                paletteActive={paletteActive}
                colors={colors}
                darkMode={darkMode}
            />
            <Loader />
            <Content
                paletteNumber={paletteNumber}
                paletteActive={paletteActive}
                colors={colors}
                darkMode={darkMode}
            />
        </ThemeProvider>
    )
}

export default App