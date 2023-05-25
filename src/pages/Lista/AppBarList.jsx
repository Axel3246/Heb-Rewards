import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { images } from '../../constants';
import { Modal } from '@mui/material';

//Queda ajustar los botones para que no queden ovalados

export default function ButtonAppBar() {

    const[show, setShow] = useState(false)

    return (
        <AppBar position="fixed" sx={{ bgcolor: '#FE231F' }}>  
            <Toolbar>    
                <Box
                    sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    flexGrow: 1,
                    }}
                >
                    
                    <IconButton
                        size="large"
                        color="inherit"
                        href='/'
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    
                
                    <IconButton href='/'>
                        <Box component="img" src={images.heb_svg} sx={{maxHeight: 120,  height: 1, width: 1}}/>
                    </IconButton>
                    

                    <IconButton onClick={() => setShow(true) }
                        size="large"
                        color="inherit"
                        href='/productos'
                    >
                        <AddIcon />
                        
                    </IconButton>
                
                    
                </Box>
            </Toolbar>
        </AppBar>
    );
}