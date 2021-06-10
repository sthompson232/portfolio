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
        fontSize: '6rem',
        fontWeight: 700,
        fontFamily: `'Poppins', sans-serif`
    }
}));