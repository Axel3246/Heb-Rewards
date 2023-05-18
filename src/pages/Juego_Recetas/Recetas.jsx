//import LikedButton from "../components/LikedButton"
import React, { useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { images } from '../../constants'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion } from 'firebase/firestore';
import RecetasPag from './RecetasPag';
import './recetas.css'
import Footer from '../Home/components/Footer'
import { CircularProgress } from '@mui/material';



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



const Recetas = () => {

    const [recetas, setRecetas] = useState([])
    const [cargar, setCargar] = useState(false);

    
  useEffect(() => {
    variable();
  }, []);

  const variable = async () => {
    try {
      const coll = collection(database, 'Recetas');
        const q = query(coll, orderBy(documentId()));
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setRecetas(
              querySnapshot.docs.map(doc => ({
                id: doc.id,
                url_imagen: doc.data().imagen, 
                nombre: doc.data().nombre, 
                productos: doc.data().productos
              })
            )
          );
        setCargar(true);
      });
      return unsuscribe;
    } catch (error) {
      console.log(error);
    }
  };

  console.log('recetas completas: ', recetas);

  if (!cargar) {
    return <CircularProgress></CircularProgress>
  }

    return (
        <>
            <Container sx={{ alignItems: 'center' }}>
                <AppBar position="fixed" sx={{ bgcolor: '#FE231F' }}>
                    <Toolbar disableGutters>
                        <Box sx={{ display: 'flex', p: 1, flexGrow: 1 }}>
                            <IconButton size="large" color="inherit" href='/'>
                                <HomeIcon />
                            </IconButton>
                            <IconButton sx={{ ml: 'auto', mr: 'auto' }} href='/'>
                                <Box component="img" src={images.heb_svg} sx={{ maxHeight: 120, height: 1, width: 1 }} />
                            </IconButton>
                            <IconButton size="large" color="inherit" href='/lista'>
                                <ShoppingCartOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                <div className="grid-container" style={{ display: 'flex'}}>
                    <div className="item-1">
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}><span>Dine</span> n' Dash!</Typography>
                        <Typography variant='h4' sx={{ fontWeight: '1', fontSize: 16, mb: 4 }}>Elige, escanea y <span>¡gana!</span></Typography>
                    </div> 
                    <div className="item-2">
                        <RecetasPag recipes={recetas} />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Recetas