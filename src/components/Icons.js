import React from 'react'
import { DjangoIcon } from './helpers/DjangoIcon'
import { ReactIcon } from './helpers/ReactIcon'
import { PostgresIcon } from './helpers/PostgresIcon'
import { Grid, Box } from '@material-ui/core'


export const Icons = ( {color} ) => {
    return (
    <Grid alignContent='space-around' container>
        <Grid item align='center' xs={12} sm={4}>
            <Box className='icon' py={5}>
                <PostgresIcon fill={color} />
            </Box>
        </Grid>
        <Grid item align='center' xs={12} sm={4}>
            <Box className='icon' py={5}>
                <DjangoIcon fill={color} />
            </Box>
        </Grid>
        <Grid item align='center' xs={12} sm={4}>
            <Box className='icon' py={5}>
                <ReactIcon fill={color} />
            </Box>
        </Grid>
    </Grid>
    )
}
