import { createMuiTheme } from '@material-ui/core';

const breakpointValues = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1200,
  xl: 1620,
  xxl: 1900
};

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
    breakpoints: {
      values: breakpointValues
    },
    spacing: 8,
    });
