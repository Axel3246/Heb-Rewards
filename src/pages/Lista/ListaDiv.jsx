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

// Se importan archivos 
import './ListaDiv.css'
import { Margin } from '@mui/icons-material';
import CustomizedSnackbars from './AlertaEliminar';

// Se importa la base de datos


export default function InsetDividers() {
  const theme = useTheme();
  const [counter, setCounter] = useState(1);
 
  // Counter menos
  const decrease = () => {
  setCounter(count => count - 1);
  };

  // Counter menos
  const increase = () => {
    setCounter(count => count + 1);
  };

  // API
  const [productos, setProductos] = useState([])

  // Get de Productos (SQL)
  const fetchUserData = () => {
    fetch("http://localhost:3000/programming-languages/getProductosLista/6")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProductos(data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  /*function fetchDelete(id) {
    fetch("http://localhost:3000/programming-languages/deleteProductosLista/6/" + id)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProductos(data)
      })
  }*/

  return (
    <div className="Content">
        
        {/*Productos de Usuario (obtenidas de Mysql)*/}
        {productos.map((item) => (
            <List
            sx={{
            width: '100%',
            maxWidth: 360,
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
                <ListItemText primary={item.nombre} secondary={"Precio: $" + item.precio + ".00"}/>
                {/*
                <ListItemSecondaryAction>
                    <IconButton aria-label="menos" onClick={decrease}>
                        {theme.direction === 'rtl' ? <RemoveCircleOutlineIcon /> : <RemoveCircleOutlineIcon />}
                    </IconButton>
                    <IconButton aria-label="cantidad">
                        <span className="counter__output">{counter}</span>
                    </IconButton>

                    <IconButton aria-label="mas" onClick={increase}>
                        {theme.direction === 'rtl' ? <AddCircleOutlineIcon /> : <AddCircleOutlineIcon />}
                    </IconButton>

                    <IconButton edge="end" aria-label="delete" >
                        <DeleteIcon />
                    </IconButton>
                    
                    
                </ListItemSecondaryAction>*/ }
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>

        ))}
    </div>
  );
}