// Lista con division
// Lau Hdz 15/05/2023
import { React, useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';

// Se importan librerias de mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import { ListItemSecondaryAction } from '@mui/material';

import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';


// Se importan iconos para botones
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


// Se importan archivos 
import './ListaDiv.css'
import { Margin } from '@mui/icons-material';
import CustomizedSnackbars from './AlertaEliminar';

import PrecioLista from './PrecioLista';

// Se importa la base de datos
var correo;
import { getAuth } from "firebase/auth";

import { auth  } from '../../FirebaseConfig'

export default function InsetDividers() {
  const theme = useTheme();

  const [fid, fsetID] = useState(null)
  const [id, setID] = useState(null)

  var userC = auth.currentUser;

    getAuth().onAuthStateChanged((user) => {
        if (user) {
          // console.log(user.email);
          userC = user
        }
      });

  useEffect(() => {
      if (userC) {
        // console.log(user.email);
        correo = userC.email;
        fetch("https://api-heb-rewards.ricardojorgejo1.repl.co/programming-languages/getId/'" + correo + "'")
      .then(response => {
        return response.json()
      })
      .then(data => {
        fsetID(data[0].usuarioID); 
      })
      
      }
  }, [])

  useEffect(() => {
    if (fid != null) {
      setID(fid)
    }
  }, [fid])


  // API
  const [productos, setProductos] = useState([])

  // State para ver si se cargo 
  const [cargar, setCargar] = useState(false);

  // Get de Productos (SQL)
  const fetchUserData = async () => {
    fetch("https://api-heb-rewards.ricardojorgejo1.repl.co/programming-languages/getProductosLista/" + id)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProductos(data)
      })
    setCargar(true);
  }

  useEffect(() => {
    if (id != null && id != null) {
      fetchUserData()
    }
  }, [id])


  function deleteUserData(idprod){
    let url ="https://api-heb-rewards.ricardojorgejo1.repl.co/programming-languages/deleteProductosLista/"+ id +"/" + idprod;
    console.log(url);
    fetch(url, {method:"delete"})
    console.log("se logro borrar");
    precioProd();
    window.location.reload(false);

  }

  // Agregar cantidad
  function agregaCant(idprod) {
    let url = `https://api-heb-rewards.ricardojorgejo1.repl.co/programming-languages/masCantidad/`+ id + `/` + idprod ;
    fetch(url, {method: 'get'})
    console.log("cambio cant");
    precioProd();
  }

  // Restar cantidad
  function restarCant(idprod, cantidad) {
    if(cantidad != 1) {
      let url = `https://api-heb-rewards.ricardojorgejo1.repl.co/programming-languages/menosCantidad/` + id + `/` + idprod ;
      fetch(url, {method: 'get'})
      precioProd();
    }
  }

  // Update de columna precioTotalProd
  function precioProd() {
    let url = `https://api-heb-rewards.ricardojorgejo1.repl.co/programming-languages/precioTotalProd/`;
    fetch(url, {method: 'get'})
    window.location.reload(false);
  }

  if (!cargar){
    return <h1>Estoy cargando</h1>
  }

  return (
    <div className="Content">
        
        {/*Productos de Usuario (obtenidas de Mysql)*/}
        {productos.map((item) => (
          <List
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            alignItems:'center',
            marginLeft: '10px'
          }}
          >
            <ListItem >
                <ListItemAvatar>
                <Avatar src={item.imagen}>
                    
                </Avatar>
                </ListItemAvatar>

                {
                  item.oferta == 0 ? <ListItemText primary={item.nombre} secondary={"Precio: $" + item.precio + ".00"}/> : <ListItemText primary={item.nombre} secondary={<> {"Oferta: $" + item.oferta + ".00"} <br/> <del>{"Precio: $" + item.precio + ".00"}</del> </>
                  }/>
                }
                
                <ListItemSecondaryAction>
                  <IconButton aria-label="menos" onClick={() => restarCant(item.productoID, item.cantidad)}>
                    {theme.direction === 'rtl' ? <RemoveCircleOutlineIcon /> : <RemoveCircleOutlineIcon />}
                  </IconButton>
                  <IconButton aria-label="cantidad">
                    <span className="counter__output">{item.cantidad}</span>
                  </IconButton>

                  <IconButton aria-label="mas" onClick={() => agregaCant(item.productoID)}>
                    {theme.direction === 'rtl' ? <AddCircleOutlineIcon /> : <AddCircleOutlineIcon />}
                  </IconButton>

                  <IconButton edge="end" aria-label="delete" onClick={() => deleteUserData(item.productoID) }>
                    <DeleteIcon />
                  </IconButton>
                    
                </ListItemSecondaryAction>
                
                
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>

        ))}
        <PrecioLista/>
    </div>

  );
}