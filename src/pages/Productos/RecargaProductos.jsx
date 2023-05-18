import React, { useState, useEffect } from 'react'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';
import './productos.css'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const RecargaProductos = ({productos}) => {

  // Post Sucursal
  /*
  function insertUserData(){
    let url ="http://localhost:3000/programming-languages/agregarproducto/6/", id;
    console.log(url);
    fetch(url, {method:"get"})
    console.log("se logro");
  }
  */

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
  }, [boton]);

  


  return (
    <div className="ContenedorCartas" style={{display: 'flex', flexDirection: 'flex-column', width: '78vw', flexWrap: 'wrap', overflowY:"visible", position: 'relative'}}>
      {productos.map((item) => (
        <div key={item.id} style={{position:'relative', height: '331px', maxHeight: '350px', width:'100%', overflow: 'hidden', textOverflow: 'clip', minWidth: '100px', maxWidth: '225px', borderColor: "#9393933c",
        borderWidth: '1px', borderStyle: 'solid', textAlign: 'center', borderRadius: '10px', margin: '0 0 4px 4px'}}>
          <a href={`/posts/${item.id}`} style={{textDecoration: 'none'}}>
            {
            item.tipo == 'R' ? 
            <div style={{position: 'absolute', backgroundColor: "#FE231F", padding: '0.5px 8px'}}>
            {
            <p style={{ color: "#fefefe", fontWeight:'bolder' }} >
              ¡DESCUENTO!
            </p> } </div> : <> {
              item.tipo == 'M' ?
              <div style={{position: 'absolute', backgroundColor: "#FE231F", padding: '0.5px 8px'}}>
            {
              <p style={{ color: "#fefefe", fontWeight:'bolder' }} >
             ¡3X2!
                </p>
            }</div> : 
              null 
            }
                </>
            }
            
            
            <img src={item.imagen} alt="" style={{marginTop: '15px', width: '150px', height: '150px'}} />
            <h3 style={{ color: "#FE231F" }} >
              {item.producto}
            </h3>
            
            {
            item.tipo == 'R' ? 
            <>
            <p style={{color: "#B12704"}}>
                ${item.oferta}.00
            </p>
            <del style={{color: "#B12704"}}>
            ${item.precio}.00
            </del></> : 
            <p style={{color: "#B12704"}}>
            ${item.precio}.00
            </p>
            }

          </a>

          {/*Boton agregar a lista*/}
          <IconButton
            size="large"
            color="black"
            className='button'
            onClick={usarBoton} 
          >
            <AddCircleOutlineIcon />
          </IconButton>

          {/*<p style={{ color: "#000" }} >{thumbnailUrl}</p>*/}
        
        </div>
      ))}

    </div>
  )
}
export default RecargaProductos;
