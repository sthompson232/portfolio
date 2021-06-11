import React from 'react'
import { Typography, Box, Grid, Card } from '@material-ui/core'
import { useStyles } from '../styles'
import bio from '../static/bio.jpeg'
import EmailIcon from '@material-ui/icons/Email'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'


export const Bio = ({ background, color, color2, button }) => {
    const classes = useStyles();
    
    return (
        <Box style={{ backgroundColor: background, border: 'none' }}>
            <Box pb={16}>
                <Grid 
                    container 
                    direction='row'
                    alignItems='center' 
                >
                    <Grid item sm={12} lg={7} xl={8} xxl={10}>
                        <Box p={4}>
                            <Typography
                                variant="h1" 
                                className={classes.paraText}
                                style={{ color: color }}
                                >
                                I am a self taught web designer and developer, currently working as a freelancer via <span style={{ color: color2 }}>yellowhousestudios. </span> 
                                <br />
                                To find out more about me, you can read my CV <span style={{ color: color2 }}>here.</span>
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid container item justify='center' sm={12} lg={5} xl={4} xxl={2}>
                        <img className={classes.bioImage} src={bio} alt="Sam Thompson"/>
                    </Grid>
                </Grid>
            </Box>
            <Box pb={16}>    
                <Grid container>
                    <Grid container item xs={12}>
                        <Box p={4}>
                            <Typography
                                variant="h1" 
                                className={classes.headingText}
                                style={{ color: color2 }}
                                >
                                Connect with me
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid container justify='center' align='center' item md={4}>
                        <Card style={{ backgroundColor: button }}>
                            <GitHubIcon />
                        </Card>
                        
                    </Grid>
                    <Grid container justify='center' align='center' item md={4} style={{ backgroundColor: button }}>
                        <LinkedInIcon />
                    </Grid>
                    <Grid container justify='center' align='center' item md={4} style={{ backgroundColor: button }}>
                        <EmailIcon />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
