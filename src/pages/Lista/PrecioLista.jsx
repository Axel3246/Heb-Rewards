// Precio lista: Lau Hdz 15/05/2023
// Última modificación: Ricardo Rdz 07/06/2023

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { getAuth } from "firebase/auth";

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

var correo;

// Inicio de función principal
function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const [total, setTotal] = useState('');
  const [totalCant, setTotalCant] = useState('');

  const [id, setID] = useState(null);
  const [prueba, setPrueba] = useState(true);

  // Obtener el ID del usuario actual
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        correo = user.email;
        fetch("https://api-heb-rewards.ricardojorgejo1.repl.co/api/getId/'" + correo + "'")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setID(data[0].usuarioID);
          setPrueba(true)
        })
      }
    });
  }, []);

  useEffect(() => {
    if (id == null) {
      setPrueba(false)
    }
    if (prueba && id!=null) {
      console.log("tu tranquilo");
      fetchUserData();
      fetchCantProd();
    }
  })

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  // State para ver si se cargo 
  const [cargar, setCargar] = useState(false);

  // Get del Total (SQL)
  const fetchUserData = () => {
    fetch("https://api-heb-rewards.ricardojorgejo1.repl.co/api/getPrecioTotal/" + id)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTotal(data[0].total);
        //document.getElementById("perry").innerHTML = total;
      })
    setCargar(true);
  }
  
  // Get de la Cantidad (SQL)
  const fetchCantProd = () => {
    fetch("https://api-heb-rewards.ricardojorgejo1.repl.co/api/getCantidadTotal/" + id)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTotalCant(data[0].totalCant);
        //document.getElementById("agenteP").innerHTML = totalCant;
      })
  }  

  if (!cargar){
    return <h1> </h1>
  }



  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(20% - ${drawerBleeding}px)`,
            overflow: 'visible' 
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
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
            <Typography sx={{ p: 2, color: 'text.secondary', marginTop:'4px'}} id="perry">Total: ${total}.00 </Typography>
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
          
          <Typography sx={{ p: 2, color: 'text.secondary'}} id="agenteP">Cantidad de productos: {totalCant}</Typography>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;