import React, { useState, useEffect } from 'react'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion } from 'firebase/firestore';
import './recetas.css'
import { Card, CardMedia, Divider, Paper, Typography, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';


const RecargaRecetas = ({ recetas }) => {
  const history = useNavigate();

  console.log(recetas[0]);

  return (
    <div className="ContenedorCartas" style={{ display: 'flex', marginTop: '20px', flexDirection: 'flex-column', width: '100%', flexWrap: 'wrap', overflowY: "visible", position: 'relative' }}>
      {recetas.map((item) => (
        <button  key={item.id} style={{backgroundColor: 'white', padding: '0px', margin: "0px 7.5px 15px 7.5px", borderWidth: "0px", display:'flex', alignItems:'center'}} onClick={() => history('/receta', { state: item  } )}>
        <Paper sx={{ml:'auto', mr:'auto'}}elevation={1} className='paper_container'>
          <CardMedia
                          component="img"
                          sx={{ height: 120, width: 120, alignItems: 'center', textAlign: 'center', marginLeft: 'auto', mr: 'auto' }}
                          image={item.url_imagen}
                          object-fit="fill"
                      />
            <Divider sx={{width:85, mb:2, ml: 'auto', mr: 'auto', backgroundColor:'#FE231F'}}></Divider>
            <div style={{width: '89%', marginLeft: 'auto', marginRight: 'auto' }}>
            <Typography gutterBottom variant="h6" component="div" sx={{fontWeight: 'bold', fontSize: 16}}>
                  {item.nombre}
            </Typography>
            </div>
            <Button variant="contained" style={{position: 'absolute',backgroundColor:'#FE231F', zIndex: 1, top: -10, right: -10, marginRight:'auto', marginLeft:'auto', height: '32px', minWidth: "40px", width: "40px"}}>
             {item.descuento}%
            </Button>
          </Paper>
         
          </button>
      ))}
    </div>
  )
}
export default RecargaRecetas;
