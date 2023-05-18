import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Grid from '@mui/material/Grid';


const TarjetaReceta = (props) => {
    return (
        <>
            {props.details.map((value, index) => (
              <Grid item sx={{ textAlign: 'center', }}>
              <Card sx={{ maxWidth: 345 }} key={index}>
                  <CardActionArea href='/receta'>
                      <CardMedia
                          component="img"
                          sx={{ height: 240 }}
                          image={value.url_imagen}
                          object-fit="contain"
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
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