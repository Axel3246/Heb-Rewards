import React, {useEffect, useState} from 'react';
import './receta.css'

import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion } from 'firebase/firestore';

import AppBarList from '../../pages/Receta/AppBarReceta.jsx'; // crear otra appbar sin el icono de agregar (holder)
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
import { useLocation } from "react-router-dom";

const Receta = ({ recetas }) => {
  
  const location = useLocation();

  let data = location.state;

  

  //const [recetas, setRecetas] = useState([]);
  const [cargar, setCargar] = useState(false);
  //const [hide, setHide] = useState(false);
  const [hide, setHide] = useState(false);

  const hideElements = (rBool) => {
    setHide(rBool);
    console.log(rBool);
  };

  




  return (
    <div className="App">
      <AppBarList codes = {data} />


      <div className="Content">
        {
          hide ?  null : <><Card sx={{ maxWidth: 0.6, m: 'auto', mt: 13 }}>
          <CardMedia
            sx={{ objectFit: 'contain', maxHeight: '180px' }}
            component="img"
            image={data.url_imagen}
          />
          <CardContent>
            <Typography variant="body2" color="text.primary">
              {data.nombre}
            </Typography>
          </CardContent>
        </Card>
        <ArrowUpwardIcon fontSize="large" sx={{ m: 2 }} />

          <Typography variant="body2" color="text.primary">
            Ingredientes
          </Typography>
        
          </>
        }

<Box sx={{ flexGrow: 1, m: 2}} alignItems="center" display={"flex"}>
            <Grid container spacing={2} style={{display:'flex', flexDirection: 'column', alignContent: 'center', width: "100%", margin: "0px"}}>
              <Tarjeta recetas={data} hideElements={hideElements}/>
            </Grid>
          </Box>
        
        
      </div>
    </div>
  );
};



export default Receta;