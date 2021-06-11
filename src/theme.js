import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
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
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
    },
    spacing: 8,
    });
