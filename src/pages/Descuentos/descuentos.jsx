import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { Container } from '@mui/material';
import { images } from '../../constants'
import Footer from '../Home/components/Footer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import DescuentosPag from './descuentosPag';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { getAuth } from "firebase/auth";
import { database } from '../../FirebaseConfig'

import './descuentos.css'

var correo;

const Descuentos = () => {

    const [descuentos, setDescuentos] = useState([]);

    const [cargar, setCargar] = useState(false);
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
        });
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [id]);

    useEffect(() => {
      console.log("descuentos xd de la 1ra pag")
      console.log(descuentos)
    },[descuentos])

    const fetchUserData = async () => {
        console.log("https://api-heb-rewards.ricardojorgejo1.repl.co/api/getDescuentos/" + id)
        fetch("https://api-heb-rewards.ricardojorgejo1.repl.co/api/getDescuentos/" + id)
          .then(response => {
            return response.json()
          })
          .then(data => {
            console.log("dios ayudame")
            console.log(data)
            setDescuentos(data)
          })
        setCargar(true);
      }
    

    if (!cargar) {
       return <CircularProgress></CircularProgress>
    }

    return (
        <>
            <Container>
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
                            <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Utiliza tus <span>¡Descuentos!</span></Typography>
                            <Typography variant='h4' sx={{ fontWeight: '1', fontSize: 16, mb: 4 }}>Elige, escanea y <span>¡gana!</span></Typography>
                        </div> 

                        <div className="item-2">
                            <DescuentosPag descuentos={descuentos} uid={id}/>
                        </div>
                    </div>

            </Container>
            <Footer/>     
        </>
    );
}

export default Descuentos;