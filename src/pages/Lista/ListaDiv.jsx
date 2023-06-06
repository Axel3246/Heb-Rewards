// Aqui muevele

// Lista con división: Lau Hdz 15/05/2023
// Modificado por: Ricardo Rdz 06/06/2023
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

// Se importan iconos para botones
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';

// Se importan archivos 
import './ListaDiv.css'
import { Margin } from '@mui/icons-material';
import CustomizedSnackbars from './AlertaEliminar';

import PrecioLista from './PrecioLista';

// Se importa lo necesario para obtener el usuario actual
import { getAuth } from "firebase/auth";
import { auth  } from '../../FirebaseConfig'

// Correo del usuario actual
var correo;

// Función principal
export default function InsetDividers() {
  const theme = useTheme();

  // Obtener el ID del usuario
  const [id, setID] = useState(null)

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
    })
  }, [id]);

  // API
  const [productos, setProductos] = useState([])

  // State para ver si se cargo 
  const [cargar, setCargar] = useState(false);

  // Get de Productos (SQL)
  const fetchUserData = async () => {
    fetch("https://api-heb-rewards.ricardojorgejo1.repl.co/api/getProductosLista/" + id)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProductos(data)
      })
    setCargar(true);
  }

  useEffect(() => {
      fetchUserData()
  }, [])

  // Eliminar un producto
  function deleteUserData(idP) {
    let url ="https://api-heb-rewards.ricardojorgejo1.repl.co/api/deleteProductosLista/"+ id +"/" + idP;
    fetch(url, {method:"get"})
    console.log("producto eliminado");
    precioProd();
    window.location.reload(false);
  }

  // Aumentar cantidad de producto
  function agregaCant(idP) {
    let url = `https://api-heb-rewards.ricardojorgejo1.repl.co/api/masCantidad/`+ id + `/` + idP ;
    fetch(url, {method: 'get'})
    console.log("+1");
    precioProd();
  }

  // Disminuir cantidad de producto
  function restarCant(idP, cantidad) {
    if(cantidad != 1) {
      let url = `https://api-heb-rewards.ricardojorgejo1.repl.co/api/menosCantidad/` + id + `/` + idP ;
      fetch(url, {method: 'get'})
      console.log("-1");
      precioProd();
    }
  }

  // Obtener precio total por producto (Update de precioTotalProd)
  function precioProd() {
    let url = `https://api-heb-rewards.ricardojorgejo1.repl.co/api/precioTotalProd/`;
    fetch(url, {method: 'get'})
    
    
    
    window.location.reload(false);
  }

  /*
  useEffect(() => {
    precioProd()
  }, [])
  */

  if (!cargar){
    return <CircularProgress></CircularProgress>
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