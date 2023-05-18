import React, { useState, useEffect } from 'react'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion } from 'firebase/firestore';
import './productos.css'

// Se importan iconos para botones
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Card, Paper, Typography } from '@mui/material';


const RecargaProductos = ({ productos }) => {

  // Post Sucursal
  /*
  function insertUserData(){
    let url ="http://localhost:3000/programming-languages/agregarproducto/6/", id;
    console.log(url);
    fetch(url, {method:"get"})
    console.log("se logro");
  }
  */
  /*
  const [boton, usarBoton] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/programming-languages/agregarproducto/2/2')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [boton]);*/

  return (
    <div className="ContenedorCartas" style={{ display: 'flex', flexDirection: 'flex-column', width: '78vw', flexWrap: 'wrap', overflowY: "visible", position: 'relative' }}>
      {productos.map((item) => (
        <Paper elevation={1} key={item.id} className='paper_container'>
          <a href={`/posts/${item.id}`} style={{ textDecoration: 'none' }}>
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
            <Button variant="contained" color="error" startIcon={<AddShoppingCartIcon color="disabled"/>}>
              Agregar
            </Button>

          </a>

          {/*Boton agregar a lista
          <IconButton
            size="large"
            color="black"
            className='button'
          >
            <AddCircleOutlineIcon />
          </IconButton>*/}

      

        </Paper>

      ))}
    </div>
  )
}
export default RecargaProductos;
