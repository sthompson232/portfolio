import { makeStyles } from '@material-ui/core/styles';

const light = '#ffffff'
const dark = '#0E0E0E'

export const useStyles = makeStyles((theme) => ({

    white: {
        color: light
    },
    black: {
        color: dark
    },
    backgroundWhite: {
        backgroundColor: light
    },
    backgroundBlack: {
        backgroundColor: dark
    },
    heroText: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '3rem'
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: '5rem'
        },
        [theme.breakpoints.only('md')]: {
            fontSize: '6rem'
        },
        [theme.breakpoints.only('lg')]: {
            fontSize: '7rem'
        },
        [theme.breakpoints.only('xl')]: {
            fontSize: '8rem'
        },
        fontSize: '6rem',
        fontWeight: 700,
        fontFamily: `'Poppins', sans-serif`,
        pointerEvents: 'none'
    },
    headingText: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '4rem'
        },
        [theme.breakpoints.only('md')]: {
            fontSize: '5rem'
        },
        fontWeight: 700,
        fontFamily: `'Poppins', sans-serif`,
        textAlign: 'center'
    }
}));