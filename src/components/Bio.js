import React from 'react'
import { Typography, Box, Grid, Container, Link } from '@material-ui/core'
import { useStyles } from '../styles'
import bio from '../static/bio.jpeg'
import { ContactButton } from './ContactButton'
import EmailIcon from '@material-ui/icons/Email'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import GitHubIcon from '@material-ui/icons/GitHub'
import cv from '../static/cv.pdf'


export const Bio = ({ background, color, color2, revColor, revButton }) => {
    const classes = useStyles();
      
    return (
        <Box style={{ backgroundColor: background, border: 'none' }}>
            <Box py={8}>
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
                                I am a self taught web developer, currently working as a <span style={{ color: color2 }}>freelancer,</span> primarily using Django and React. 
                                <br />
                                <br />
                                To find out more about me, you can read my CV <Link target="_blank" href={cv} style={{ color: color2, textDecoration: 'none' }}>here.</Link>
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid container item justify='center' sm={12} lg={5} xl={4} xxl={2}>
                        <img className={classes.bioImage} src={bio} alt="Sam Thompson"/>
                    </Grid>
                </Grid>
            </Box>
            <Box pb={4}>    
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
                    <Container maxWidth={false}>
                        <Grid container spacing={4}>
                            <ContactButton 
                                icon={<GitHubIcon className={classes.buttonIcon} style={{ color: revColor }}/>} 
                                button={revButton} 
                                link={'https://github.com/sthompson232'}
                            />
                            <ContactButton 
                                icon={<LinkedInIcon className={classes.buttonIcon} style={{ color: revColor }}/>} 
                                button={revButton} 
                                link={'https://www.linkedin.com/in/sam-thompson-b20964185/'}
                            />
                            <ContactButton 
                                icon={<EmailIcon className={classes.buttonIcon} style={{ color: revColor }}/>} 
                                button={revButton} 
                                link={'mailto:samthompson292@gmail.com'}
                            />
                        </Grid>
                    </Container>
                </Grid>
            </Box>
        </Box>
    )
}
