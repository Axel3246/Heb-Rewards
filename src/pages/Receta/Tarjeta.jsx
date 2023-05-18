import React, {useEffect, useState} from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';

import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { key } from 'localforage';


const Tarjeta = ({ recetas }) => {

  const location = useLocation();

  let receta = location.state;

  const [productos, setProductos] = useState([])
  //const [termsValidation, setTermsValidation] = useState(false)

    
  useEffect(() => {
   
  
      console.log("Receta es esto:" , receta);
      const coll = collection(database, 'Productos');
      const q = query(coll, where(documentId(), 'in', receta.productos));

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

  }, [])



    return (
        <div style={{ display: 'flex', flexDirection: 'flex-column', width: '78%', flexWrap: 'wrap', overflowY: "visible", alignItems: "center", justifyContent: "center", position: 'relative' }}>
            {productos.map((item) => (
                <Card key={item.id} sx={{ width: '160px', height: '200px', ml: 1, mr: 1, mb: 2}}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.url_imagen}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">{item.nombre}</Typography>
                </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Tarjeta;