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
import { useEffect, useState } from 'react';

import { getFirestore, addDoc, collection, getDocs, getDoc, doc, getCountFromServer, onSnapshot, documentId, query, where } from "firebase/firestore";

import { database } from '../../FirebaseConfig'

const receta = () => {

    const [rows, setRows] = useState([])
    const [producto, setProducto] = useState([])
    var arrayProductos = [];
    
    useEffect(() => {
        const q = query(collection(database, "Recetas"), where(documentId(), "==", "1"));
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setRows(
              querySnapshot.docs.map(doc => ({
                id: doc.id,
                url_imagen: doc.data().imagen, 
                nombre: doc.data().nombre, 
                productos: doc.data().productos
              })
            )
          )})
          
            return unsuscribe;
    },[])

    
    useEffect(() => {
        console.log("hi")
        console.log(rows[0]?.productos)
        rows[0]?.productos.forEach(element => {
            const q2 = query(collection(database, "productos"), where(documentId(), "==", element));
            //const coll2 = collection(database, 'Productos');
            const unsuscribe2 = onSnapshot(q2, querySnapshot => {
            setProducto(
                  querySnapshot.docs.map(doc => ({
                    img: doc.data().imagen, 
                    description: doc.data().producto
                  })
                ))})
            console.log(producto);
                return unsuscribe2;
        });
    },[rows])


    console.log(producto);
    

    
    
    return (
      <div className="App">
        <AppBarList/>
        <div className="Content">

            
            <Card sx={{ maxWidth: 0.60, m: 'auto', mt: 13}}> 
            <CardMedia
                sx={{ objectFit: 'contain', maxHeight:'180px' }}
                component="img"
                image={rows[0]?.url_imagen}

            />
                <CardContent>
                    <Typography variant="body2" color="text.primary">
                    {rows[0]?.nombre}
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

export default receta