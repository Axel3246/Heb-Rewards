import React, {useEffect, useState} from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';


import Grid from '@mui/material/Grid';


const Tarjeta = ({ receta }) => {

  const [productos, setProductos] = useState([])
  const [termsValidation, setTermsValidation] = useState(false)

    
  useEffect(() => {
   
  
      console.log("Receta es esto:" , receta);
      const coll = collection(database, 'Productos');
      const q = query(coll, where(documentId(), 'in', receta[0].products));

      const unsuscribe = onSnapshot(q, querySnapshot => {
        setProductos(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              url_imagen: doc.data().imagen, 
              nombre: doc.data().producto, 
              codigo: doc.data().upc
            })
          )
    
        )})
          return unsuscribe;
          console.log('run something here');
        
      //const q = query(collectionRef,  where("sucursal", '==', "ESL"));

  }, [termsValidation])



    return (
        <>
            {productos.map((item) => (
              <Grid item xs={6} key={item.id}>
                <Card sx={{ width: '160px', height: '200px' }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.url_imagen}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">{item.nombre}</Typography>
                </CardContent>
                </Card>
              </Grid>
            ))}
        </>
    )
}

export default Tarjeta;