import React, {useEffect, useState} from 'react';
import './receta.css'

import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion } from 'firebase/firestore';

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

import polloR from './polloRostizado.jpg';
import { CircularProgress } from '@mui/material';

const Receta = () => {
  const [recetas, setRecetas] = useState([]);
  const [cargar, setCargar] = useState(false);

  useEffect(() => {
    variable();
  }, []);

  const variable = async () => {
    try {
      const coll = collection(database, 'Recetas');
      const unsubscribe = onSnapshot(coll, (querySnapshot) => {
        setRecetas(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            url_imagen: doc.data().imagen,
            nombre: doc.data().nombre,
            products: doc.data().productos,
          }))
        );
        setCargar(true);
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  console.log('recetas completas: ', recetas);

  if (!cargar) {
    return <CircularProgress></CircularProgress>
  }

  return (
    <div className="App">
      <AppBarList />
      <div className="Content">
        <Card sx={{ maxWidth: 0.6, m: 'auto', mt: 13 }}>
          <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '180px' }}
            component="img"
            image={polloR}
          />
          <CardContent>
            <Typography variant="body2" color="text.primary">
              Pollo Rostizado Sabor Original 1 kg (prueba de texto)
            </Typography>
          </CardContent>
        </Card>

        <ArrowUpwardIcon fontSize="large" sx={{ m: 2 }} />

        <Typography variant="body2" color="text.primary">
          Ingredientes
        </Typography>
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <Grid container spacing={2}>
            <Tarjeta recetas={recetas}/>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Receta;