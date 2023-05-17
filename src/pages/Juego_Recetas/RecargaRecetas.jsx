import React, { useState, useEffect } from 'react'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion } from 'firebase/firestore';
import './recetas.css'
import { Card, Paper, Typography } from '@mui/material';

const RecargaRecetas = ({ recetas }) => {


  return (
    <div className="ContenedorCartas" style={{ display: 'flex', flexDirection: 'flex-column', width: '77vw', flexWrap: 'wrap', overflowY: "visible", position: 'relative' }}>
      {recetas.map((item) => (
        <Paper elevation={1} key={item.id} className='paper_container'>
          
            <img src={item.url_imagen} alt="" style={{ marginTop: '15px', width: '150px', height: '150px' }} />
                <p style={{ color: "#B12704", fontWeight: 'bold', fontSize: 18 }}>
                  {item.nombre}
                </p>
        </Paper>
      ))}
    </div>
  )
}
export default RecargaRecetas;
