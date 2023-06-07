import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';

import Grid from '@mui/material/Grid';


const TarjetaReceta = (props) => {
    return (
        <>

            {props.details.map((value, index) => (
                <Grid item sx={{ textAlign: 'center', }}>
                <Card sx={{ width: 270 }} key={index}>
                    <CardActionArea href='/receta'>
                        <CardMedia
                            component="img"
                            sx={{ height: 210 }}
                            image={value.url_imagen}
                            object-fit="fill"
                        />
                        <CardContent>
                        <Divider sx={{width:250, mb:2}}></Divider>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 'bold'}}>
                                {value.nombre}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
              </Grid>
              
              ))}
            
        </>
    )
}

export default TarjetaReceta;