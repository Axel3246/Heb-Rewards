import React, { useState, useEffect } from 'react'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion } from 'firebase/firestore';
import './productos.css'

// Se importan iconos para botones
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';

// Se importan iconos para botones
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import './RecargaProductos.css'

import { Card, Paper, Typography } from '@mui/material';

import { getAuth } from "firebase/auth";

var correo;

const RecargaProductos = ({ productos }) => {

  const [id, setID] = useState(null)

  // Obtener el ID y lista del usuario actual
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
        })
      }
    });
  }, []);

  // Post del producto en la Lista  
  function insertUserData(idP, pr){
    console.log(id)
    let url = "https://api-heb-rewards.ricardojorgejo1.repl.co/api/agregarproducto/" + id + "/" + idP + "/" + pr;
    console.log(url);
    fetch(url, {method:"get"})
    console.log("se logro");
    precioProd;
  }

  // Update de columna precioTotalProd
  const precioProd = (event) => {
    event.preventDefault();
    let url = `https://api-heb-rewards.ricardojorgejo1.repl.co/api/precioTotalProd/`;
    fetch(url, {method: 'put'})
    window.location.reload(false);
  }

  return (
    <>
    {
      localStorage.getItem('sucursal') ?  <> { productos[0] != null ? <div className="ContenedorCartas" style={{ display: 'flex', flexDirection: 'flex-column', width: '78vw', flexWrap: 'wrap', overflowY: "visible", position: 'relative' }}>
      {productos.map((item) => (
        <Paper elevation={1} key={item.id} className='paper_containerP'>
            {
              item.tipo == 'R' ?
                <div className='flyerDesc'>
                  {
                    <p style={{ color: "#fefefe", fontWeight: 'bolder' }} >
                      ¡DESCUENTO!
                    </p>} </div> : <> {
                      item.tipo == 'M' ?
                        <div className='flyerTresDos'>
                          {
                            <p style={{ color: "#fefefe", fontWeight: 'bolder' }} >
                              ¡3X2!
                            </p>
                          }</div> :
                        null
                    }
                </>
            }

            <img src={item.imagen} alt="" style={{ marginTop: '15px', width: '150px', height: '150px' }} />
            <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: 20, color: "#FE231F", mt: 1 }} >
              {item.producto}
            </Typography>

            {
              item.tipo == 'R' ?
                <>
                  <p style={{ color: "#B12704", fontWeight: 'bold', fontSize: 16 }}>
                    ${item.oferta}.00
                  </p>
                  <p style={{ margin: '0 0 1rem 0' }}><del style={{ color: "#B12704", fontSize: 14 }}>
                    ${item.precio}.00
                  </del></p></> :
                <p style={{ color: "#B12704", fontWeight: 'bold', fontSize: 18 }}>
                  ${item.precio}.00
                </p>
            }




          {/*Boton agregar a lista*/}
          <Button variant="contained" color="error" onClick={() => insertUserData(item.id, item.precio)} startIcon={<AddShoppingCartIcon color="disabled"/>} >
            Agregar
          </Button>

      

        </Paper>

      ))}
    </div> : <Alert variant="filled" severity="error" style={{marginTop: 200, marginBottom: 200}}>
        ¡Lo sentimos! No existen productos de esta categoría.
      </Alert> } </> 
      
       : <Alert variant="filled" severity="error" style={{marginTop: 200, marginBottom: 200}}>
        ¡Asegúrate de haber escogido una sucursal!
      </Alert>
    }
   </>
  )
}
export default RecargaProductos;
