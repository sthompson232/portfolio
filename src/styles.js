import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    lightPrimary: {
        color: '#000000'
    },
    darkPrimary: {
        color: '#ffffff'
    },
    lightSecondary: {
        color: '#ffffff'
    },
    darkSecondary: {
        color: '#000000'
    },
    buttonLight: {
        color: '#000000',
        backgroundColor: '#ffffff'
    },
    buttonDark: {
        color: '#ffffff',
        backgroundColor: '#000000'
    },
    backgroundLight: {
        background: '#ffffff'
    },
    backgroundDark: {
        background: '#000000'
    },
    heroText: {
        fontSize: '7rem',
        fontWeight: 700,
        fontFamily: `'Poppins', sans-serif`
    }
}));