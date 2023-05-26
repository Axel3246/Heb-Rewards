// Parte de abajo donde se tiene la seleccion de pistas
// Axel Hdz, Lau Hdz Y Ricardo Rdz 25/05/2023

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import './pistas.css'
import ModalNuevaPista from './ModalNuevaPista';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer() {
  {/* Declaracion de estado*/}
  const[show, setShow] = useState(false)

  return (
    <div className="Content">
        <Root>
            <CssBaseline />
            <Global
                styles={{
                '.MuiDrawer-root > .MuiPaper-root': {
                    height: `calc(50% - ${drawerBleeding}px)`,
                    overflow: 'visible',
                },
                }}
            />
                <StyledBox
                sx={{
                    position: 'absolute',
                    top: -drawerBleeding,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    visibility: 'visible',
                    right: 0,
                    left: 0,
                }}
                >
                <Puller />
                <Box sx={{ textAlign: 'center'}}>
                    <Typography sx={{fontWeight: 'bold', p: 2, color: 'text.secondary', marginTop:'4px' }}>What's that product?</Typography>
                </Box>
                </StyledBox>
                <StyledBox
                sx={{
                    px: 2,
                    pb: 2,
                    height: '100%',
                    overflow: 'auto',
                }}
                >
                    <Box sx={{ textAlign: 'center'}}>
                        <Typography sx={{ p: 2, color: 'text.secondary'}}>¿Necesitas ayuda? <span className="red_two" >Selecciona una pista</span></Typography>
                        {/*<Button variant="contained" color="error"> 
                          Pista 1
              </Button>*/}
                        <ModalNuevaPista onClose={() => setShow(false)} show={show} />
                        {/*<Button variant="outlined" color="error"> 
                          Pista 2
            </Button>*/}
                        {/*<Button variant="contained" color="error"> 
                          Pista 3
                        </Button>
                        <Button variant="outlined" color="error"> 
                          Pista 4
          </Button>*/}
                    </Box>
                {/*<Skeleton variant="rectangular" height="100%" />*/}
                </StyledBox>
        </Root>
    </div>
  );
}

SwipeableEdgeDrawer.propTypes = {
  
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;