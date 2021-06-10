import { createMuiTheme } from '@material-ui/core';


export let lightTheme = createMuiTheme({
    palette: {
        primary: {
          main: "#000000"
        },
        secondary: {
          main: "#ffffff",
        },
        white: {
          main: "#ffffff",
        },
      },
    typography: {
    "fontFamily": `'Poppins', sans-serif`,
    "fontSize": 15,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
    },
    spacing: 8,
    });


export let darkTheme = createMuiTheme({
    palette: {
        primary: {
          main: "#000000"
        },
        secondary: {
          main: "#ffffff",
        },
        white: {
          main: "#ffffff",
        },
      },
    typography: {
    "fontFamily": `'Poppins', sans-serif`,
    "fontSize": 15,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
    },
    spacing: 8,
    });