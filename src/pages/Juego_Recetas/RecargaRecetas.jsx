import React, { useState, useEffect } from 'react'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion } from 'firebase/firestore';
import './recetas.css'
import { Card, CardMedia, Divider, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const RecargaRecetas = ({ recetas }) => {
  const history = useNavigate();

  console.log(recetas[0]);

  return (
    <div className="ContenedorCartas" style={{ display: 'flex', marginTop: '20px', flexDirection: 'flex-column', width: '77vw', flexWrap: 'wrap', overflowY: "visible", position: 'relative' }}>
      {recetas.map((item) => (
        <button style={{backgroundColor: 'white', padding: '0px', margin: "0px 15px 15px 0px", borderWidth: "0px"}} onClick={() => history('/receta', { state: item  } )}>
        <Paper elevation={1} key={item.id} className='paper_container'>
          <CardMedia
                          component="img"
                          sx={{ height: 200, width: 200 }}
                          image={item.url_imagen}
                          object-fit="fill"
                      />
            <Divider sx={{width:200, mb:2}}></Divider>
            <Typography gutterBottom variant="h6" component="div" sx={{fontWeight: 'bold'}}>
                  {item.nombre}
            </Typography>
          </Paper>
          </button>
      ))}
    </div>
  )
}
export default RecargaRecetas;
