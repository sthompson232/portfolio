import React from 'react'
import { DjangoIcon } from './helpers/DjangoIcon'
import { ReactIcon } from './helpers/ReactIcon'
import { PostgresIcon } from './helpers/PostgresIcon'
import { Grid, Box } from '@material-ui/core'


export const Icons = ( {color} ) => {
    return (
    <Grid alignContent='space-between' container>
        <Grid item xs={4}>
            <Box p={8}>
                <PostgresIcon fill={color} />
            </Box>
        </Grid>
        <Grid item xs={4}>
            <Box p={8}>
                <DjangoIcon fill={color} />
            </Box>
        </Grid>
        <Grid item xs={4}>
            <Box p={8}>
                <ReactIcon fill={color} />
            </Box>
        </Grid>
    </Grid>
    )
}
