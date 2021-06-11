import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { useStyles } from '../styles'


export const Section = ({background, color, content}) => {
    const classes = useStyles();

    return (
        <Box
            py={24}
            style={{ backgroundColor: background, border: 'none' }}
        >
            <Typography
                variant="h1" 
                className={classes.headingText}
                style={{ color: color }}
                >
                {content}
            </Typography>
        </Box>
    )
}
