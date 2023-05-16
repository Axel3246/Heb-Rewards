import React from 'react';
import './receta.css'

import AppBarList from '../../pages/Lista/AppBarList.jsx'; // crear otra appbar sin el icono de agregar (holder)
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { images } from '../../constants' //solo imagen de prueba (holder)

import CardData from './CardData.jsx';
import Tarjeta from './Tarjeta';

import polloR from  './polloRostizado.jpg' //holder

export default function App() {

    return (
      <div className="App">
        <AppBarList/>
        <div className="Content">

            
            <Card sx={{ maxWidth: 0.60, m: 'auto', mt: 13}}> 
            <CardMedia
                sx={{ objectFit: 'contain', maxHeight:'180px' }}
                component="img"
                image={polloR}

            />
                <CardContent>
                    <Typography variant="body2" color="text.primary">
                    Pollo Rostizado Sabor Original 1 kg (prueba de texto)
                    </Typography>
                </CardContent>
            </Card>


            <ArrowUpwardIcon fontSize="large" sx={{m:2}}/>


            <Typography variant="body2" color="text.primary">Ingredientes</Typography>
            <Box sx={{flexGrow: 1 , m:2}}>
                <Grid container spacing={2}>
                    <Tarjeta details={CardData} />
                </Grid>
            </Box>
        </div>
      </div>
    );
}