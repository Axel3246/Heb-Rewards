// Lista con división: Lau Hdz 15/05/2023
// Última modificación: Ricardo Rdz 06/06/2023

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

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// Se importan archivos 
import './ListaDiv.css'
import { Margin } from '@mui/icons-material';
import CustomizedSnackbars from './AlertaEliminar';
import PrecioLista from './PrecioLista';

// Se importa lo relacionado con la autenticación
import { getAuth } from "firebase/auth";
import { auth  } from '../../FirebaseConfig'
import { idID } from '@mui/material/locale';

var correo;

export default function InsetDividers() {
  const theme = useTheme();

  const [id, setID] = useState(null)
  const [prueba, setPrueba] = useState(true);
  const [switcher, setSwitcher] = useState(true);

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
          setPrueba(true)
        })
      }
    });
  }, []);

  useEffect(() => {
    console.log("i tried so hard")
    if (id == null) {
      setPrueba(false)
    }
    if (prueba && id!=null) {
      fetchUserData();
      console.log("actualizando");
    }
    
  }, [prueba])
  

  // API
  const [productos, setProductos] = useState([])

  // State para confirmar que cargó 
  const [cargar, setCargar] = useState(false);

  // Obtener productos de la lista
  const fetchUserData = async () => {
    console.log("https://api-heb-rewards.ricardojorgejo1.repl.co/api/getProductosLista/" + id)
    fetch("https://api-heb-rewards.ricardojorgejo1.repl.co/api/getProductosLista/" + id)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        setProductos(data)
      })
    setCargar(true);
    setPrueba(false);
  }

  // Eliminar un producto de la lista
  function deleteUserData(idP){
    let url ="https://api-heb-rewards.ricardojorgejo1.repl.co/api/deleteProductosLista/"+ id +"/" + idP;
    console.log(url);
    fetch(url, { method:"get" })
    console.log("Producto eliminado");
    const newProds = productos.filter((prod) => prod.productoID !== idP);
    setProductos(newProds);
    setSwitcher(!switcher);
  }

  // Aumentar en 1 la cantidad de un producto
  function agregaCant(idP) {
    let url = `https://api-heb-rewards.ricardojorgejo1.repl.co/api/masCantidad/`+ id + `/` + idP ;
    fetch(url, { method: 'get' })
    console.log("+1");
    const newProds = productos.map((prod) => {
      if (prod.productoID == idP) {
        return {...prod,cantidad: prod.cantidad+1}
      }
      return prod;
    });
    setProductos(newProds);
    precioProd();
    setSwitcher(!switcher);
  }

  // Disminuir en 1 la cantidad de un producto
  function restarCant(idP, cantidad) {
    if(cantidad != 1) {
      let url = `https://api-heb-rewards.ricardojorgejo1.repl.co/api/menosCantidad/` + id + `/` + idP ;
      fetch(url, { method: 'get' })
      console.log("-1");
      const newProds = productos.map((prod) => {
        if (prod.productoID == idP) {
          return {...prod,cantidad: prod.cantidad-1}
        }
        return prod;
      });
      setProductos(newProds);
      precioProd();
      setSwitcher(!switcher);
    }
  }

  // Obtener nuevo precio total por producto (update de precioTotalProd)
  function precioProd() {
    let url = `https://api-heb-rewards.ricardojorgejo1.repl.co/api/precioTotalProd/`;
    fetch(url, { method: 'get' })
    setPrueba(true);
  }

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
        <PrecioLista switcherPrecio = {switcher}/>
    </div>

  );
}