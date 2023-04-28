//import LikedButton from "../components/LikedButton"
import React, { useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBarHome from '../Home/components/AppBarHome'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
//import AppSearchBar from "../AppSearchBar"
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { images } from '../../constants'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';
import ProductoPag from './ProductoPag';
import './productos.css'



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '32px',
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.85),
    },
    marginRight: theme.spacing(3),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'action',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));



const Productos = () => {

    const [nombre, onChange] = useState('')
    const [productos, setProductos] = useState([])
    const [departamento, setDepartamento] = useState('')
    const [hayOferta, setHayOferta] = useState('')

    var value = '';
    var q;

    const ShowSelected = () => {
        /* Para obtener el valor */
        var cod = document.getElementById("producto").value;
        console.log(cod);
        setDepartamento(cod);
         
        /* Para obtener el texto
        var combo = document.getElementById("producto");
        var selected = combo.options[combo.selectedIndex].text;
        console.log(selected);*/
        }
    
    useEffect(() => {

        const collectionRef = collection(database, 'Productos');
        
        if(departamento == '' && hayOferta == '')
        {
            q = query(collectionRef, where("sucursal", '==', "ESL"), orderBy('producto'), startAt(nombre), endAt(nombre + '\uf8ff'))
        }
        else if (departamento != '' && hayOferta == '')
        {
            q = query(collectionRef, where("sucursal", '==', "ESL"), where("departamento", '==', departamento), orderBy('producto'), startAt(nombre), endAt(nombre + '\uf8ff'))
        }
        else if (departamento == '' && hayOferta != '')
        {
            q = query(collectionRef, where("sucursal", '==', "ESL"), where("tipo", 'in', ['M', 'R']), orderBy('producto'), startAt(nombre), endAt(nombre + '\uf8ff'))
        }
        else if (departamento != '' && hayOferta != '')
        {
            q = query(collectionRef, where("sucursal", '==', "ESL"), where("tipo", 'in', ['M', 'R']), where("departamento", '==', departamento), orderBy('producto'), startAt(nombre), endAt(nombre + '\uf8ff'))
        }

        

        //const q = query(collectionRef,  where("sucursal", '==', "ESL"));
        
        
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setProductos(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              capacidad: doc.data().capacidad,
              departamento: doc.data().departamento,
              fecha: doc.data().fecha,
              imagen: doc.data().imagen,
              id2: doc.data().id,
              marca: doc.data().marca,
              multiplo: doc.data().multiplo,
              oferta: doc.data().oferta,
              pasillo: doc.data().pasillo,
              precio: doc.data().precio,
              producto: doc.data().producto,
              sucursal: doc.data().sucursal,
              tipo: doc.data().tipo,
              unidad: doc.data().unidad,
              upc: doc.data().upc,
            })
          )
    
        )})
          console.log("Vuelve a repetir")
          return unsuscribe;
      
      }, [nombre, departamento, hayOferta]) 

  return (
    <div style={{width: '100vw', marginTop:'135px'}}>
            <AppBar position="fixed" sx={{ bgcolor: '#FE231F' }}>  
            <Toolbar disableGutters>    
                <Box
                    sx={{
                    display: 'flex',
                    p: 1,
                    flexGrow: 1
                    }}
                >
                    
                    <IconButton
                        size="large"
                        color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    
                    
                
                    <IconButton sx={{ml:'auto', mr:'auto'}} href='/'>
                        <Box component="img" src={images.heb_svg} sx={{maxHeight: 120, height: 1, width: 1}}/>
                    </IconButton>
                    
                    
                    <IconButton
                        size="large"
                        color="inherit"
                        
                    >
                        <LocalCafeOutlinedIcon />
                    </IconButton>

                    <IconButton
                        size="large"
                        color="inherit"
                        href='/lista'
                    >
                    <ShoppingCartOutlinedIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            
            <Box sx={{px:2}}>
                <Button variant="text" color="inherit" size="small" startIcon={<LocationOnOutlinedIcon />}>
                    Nombre de sucursal
                </Button>
            </Box>

            <Box sx={{px:2, py:1}}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon color="action"/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Buscar en heb.com.mx"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => {onChange(e.target.value)}}
                />
            </Search>
            </Box>
        </AppBar>
        
        <div className="grid-container" style={{display: 'flex'}}>
        <div className="item-1" style={{marginTop: '50px', minWidth: '22vw'}}>
        
        <p>Selecciona el departamento...</p>
        <select id="producto" name="producto" onChange={ShowSelected}>
            <option value=''>Todo...</option>
            <option value='Alimentos Preparados'>Alimentos Preparados</option>
            <option value='Bebés'>Bebés</option>
            <option value='Botanas'>Botanas</option>
            <option value='Carnes y Aves'>Carnes y Aves</option>
            <option value='Cervezas'>Cervezas</option>
            <option value='Despensa'>Despensa</option>
            <option value='Desechables'>Desechables</option>
            <option value='Deportes'>Deportes</option>
            <option value='Farmacia'>Farmacia</option>
            <option value='Frutas y Verduras'>Frutas y Verduras</option> 
        </select>

        </div>
        <div className="item-2">
            <ProductoPag products={productos} />
        </div>
        </div>

    </div>
   


   
  )
}

export default Productos