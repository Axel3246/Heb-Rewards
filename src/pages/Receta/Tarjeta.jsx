import React, {useEffect, useState} from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';

import IconButton from '@mui/material/IconButton';

import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

import '../../pages/Lista/Modal.css'

import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { key } from 'localforage';

const location = useLocation();

  let receta = location.state;


  let productosDescubiertos = new Array(receta.productos.length).fill(false);

const Tarjeta = ({ recetas }) => {

  

  const [productos, setProductos] = useState([])
  const [newCode, setNewCode] = useState("-1")
  //const [termsValidation, setTermsValidation] = useState(false)

  const [productoEncontradoID, setproductoEncontradoID] = useState("-1");

  const findCode =  (code) => { 
    var i = 0;
    productos.forEach(element => {
      if (element.codigo == code) {
        // Código encontrado
        productosDescubiertos[i] = true;
        console.log(productosDescubiertos.at(i))
        console.log(productosDescubiertos)
      }
      i++;
    });
  }

    
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



  const[show, setShow] = useState(false)
  const hStyle = { color: 'black' , textAlign: "center"};

    return (
      
        <div style={{ display: 'flex', flexDirection: 'flex-column', width: '78%', flexWrap: 'wrap', overflowY: "visible", alignItems: "center", justifyContent: "center", position: 'relative' }}>
          <button onClick = {() => {
            findCode(newCode);

          }}>  </button> 
          <TextField margin="normal"
                            onChange={(e) => setNewCode(e.target.value)}
                            required
                            fullWidth={true}
                            id="code"
                            label="Código"
                            name="code"
                            value={newCode}
                            autoComplete="code"
                            autoFocus
                        />

        
            {productos.map((item) => (
              <Card key={item.id} sx={{ width: '160px', height: '200px', ml: 1, mr: 1, mb: 2}}>

              
              {
              
                
                productosDescubiertos.at(receta.productos.indexOf(item.id)) ?  
                <>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.url_imagen}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">Encontrado</Typography>
                </CardContent>
                </>
                : 
                <>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.url_imagen}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">{item.nombre}</Typography>
                </CardContent>
                </>


              }
              </Card >
            ))}
        </div>
    )
}

export default Tarjeta;