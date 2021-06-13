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
        [theme.breakpoints.down('xs')]: {
            fontSize: '2rem'
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: '3.5rem'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '4rem'
        },
        fontWeight: 700,
        fontFamily: `'Poppins', sans-serif`,
        textAlign: 'center'
    },
    websiteText: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem'
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: '2.5rem'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '4rem'
        },
        fontWeight: 700,
        fontFamily: `'Poppins', sans-serif`,
        textAlign: 'center' 
    },
    bioImage: {
        width: '100%',
        height: 'auto',
        maxWidth: '500px',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '250px'
        },
        [theme.breakpoints.only('sm')]: {
            maxWidth: '300px'
        },
        [theme.breakpoints.only('md')]: {
            maxWidth: '400px'
        },
    },
    paraText: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.8rem'
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: '3rem'
        },
        [theme.breakpoints.only('md')]: {
            fontSize: '3.5rem'
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '4rem'
        },
        fontWeight: 600,
        fontFamily: `'Poppins', sans-serif`,
    },
    button: {
        textAlign: 'center',
        padding: 60,
    },
    buttonIcon: {
        fontSize: '7rem'
    },
}));