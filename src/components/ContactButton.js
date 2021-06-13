import React from 'react'
import { Grid, Paper, Link } from '@material-ui/core'
import { useStyles } from '../styles'


export const ContactButton = ({ icon, button, link }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} md={4}>
            <Link href={link} target="_blank">
                <Paper className={`${classes.button} hover`} style={{ backgroundColor: button }}>
                    {icon}
                </Paper>
            </Link>
        </Grid>
    )
}

