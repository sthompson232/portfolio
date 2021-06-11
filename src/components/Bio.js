import React from 'react'
import { Typography, Box, Grid } from '@material-ui/core'
import { useStyles } from '../styles'
import bio from '../static/bio.jpeg'


export const Bio = ({ background, color }) => {
    const classes = useStyles();
    
    return (
        <Box
            py={24}
            style={{ backgroundColor: background, border: 'none' }}
        >
            <Grid container alignItems='center'>
                <Grid item sm={12} md={7} lg={8} xl={9}>
                    <Box p={4}>
                        <Typography
                            variant="h1" 
                            className={classes.paraText}
                            style={{ color: color }}
                            >
                            I am a self taught web designer and developer, currently working as a freelancer via yellowhousestudios.  
                            <br />
                            To find out more about me, you can read my CV here.
                        </Typography>
                    </Box>

                </Grid>
                <Grid item sm={12} md={5} lg={4} xl={3}>
                    <img className={classes.bioImage} src={bio} />
                </Grid>
            </Grid>
        </Box>
    )
}
