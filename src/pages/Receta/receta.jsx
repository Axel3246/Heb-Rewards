import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import './receta.css'

//Componentes
import AppBarList from '../../pages/Receta/AppBarReceta.jsx'; 
import Tarjeta from './Tarjeta';

//Material UI
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';  
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { Divider} from '@mui/material';


const Receta = ({ recetas }) => {
  
  const location = useLocation();

  let data = location.state;

  

  //const [recetas, setRecetas] = useState([]);
  const [cargar, setCargar] = useState(false);
  //const [hide, setHide] = useState(false);
  const [hide, setHide] = useState(false);

  const hideElements = (rBool) => {
    setHide(rBool);
    console.log(rBool);
  };

  




  return (
    <div className="App">

      <AppBarList codes = {data} />

      <div className="Content">
        { hide ?  null : 
          <>
            <Card sx={{ maxWidth: 0.6, m: 'auto', mt: 13 }}>
              <CardMedia
                sx={{ objectFit: 'contain', maxHeight: '180px' }}
                component="img"
                image={data.url_imagen}
              />
              <CardContent>
                
            <Divider sx={{width:130, mb:2, ml: 'auto', mr: 'auto', backgroundColor:'#FE231F'}}></Divider>
                <Typography gutterBottom variant="h6" component="div" sx={{fontWeight: 'bold', fontSize: 20}}>
                  {data.nombre}
            </Typography>
              </CardContent>
            </Card>

            <Typography variant='h4' sx={{ fontWeight: 'bold', fontSize: '30px', m: 2 }}>
              Ingredientes
            </Typography>
          </>
        }

        <Box sx={{ flexGrow: 1, m: 1}} alignItems="center" display={"flex"}>
          <Grid container spacing={1} style={{display:'flex', flexDirection: 'column', alignContent: 'center', width: "100%", margin: "0px"}}>
            <Tarjeta recetas={data} hideElements={hideElements}/>
          </Grid>
        </Box>

      </div>
    </div>
  );
};



export default Receta;