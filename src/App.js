import React, { useState } from 'react'
import { Loader } from './Loader'
import { Landing } from './Landing'
import "./ColorMaterial"
import { 
    Typography, 
    Paper,
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


const App = () => {

    const colors = require('nice-color-palettes');
    const classes = useStyles();
    const startPalette = [8, 17, 30, 31, 38, 45, 50, 52, 62, 75, 83, 85, 89] 

    const [darkMode, setDarkMode] = useState(false)
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
                                        onClick={() => {
                                            setDarkMode(!darkMode) 
                                            setPaletteActive(false)
                                            setPaletteNumber(darkMode ? 11 : 36)
                                        }} 
                                    >
                                    {!darkMode ? 
                                    <Brightness2OutlinedIcon style={{ fontSize: 50, color: colors[paletteNumber][2] }} /> : 
                                    <Brightness7Icon style={{ fontSize: 50, color: colors[paletteNumber][2] }} />
                                    }
                                    </IconButton>
                                    <IconButton
                                        onClick={() => { 
                                            setPaletteNumber(Math.floor(Math.random() * 100))
                                            setPaletteActive(true)
                                        }}
                                    >
                                        <PaletteIcon style={{ fontSize: 50, color: colors[paletteNumber][2] }} /> 
                                    </IconButton>
                                </div>
                                :
                                <div>
                                    <IconButton 
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
            <Paper 
                className={darkMode ? 
                classes.backgroundBlack :
                classes.backgroundWhite
            }>
                <Typography 
                    variant="h1" 
                    className={darkMode ? 
                        classes.white : 
                        classes.black
                    }>Full stack developer</Typography>
            </Paper>
        </ThemeProvider>
    )
}

export default App