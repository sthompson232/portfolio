
import React from 'react'
import { 
    Typography, 
    AppBar,
    Toolbar,
    Button
} from '@material-ui/core';

export const Navbar = () => {
    return (
        <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6">
            News
            </Typography>
        </Toolbar>
        </AppBar>
    )
}
