import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';


const Tarjeta = (props) => {
    return (
        <>
            {props.details.map((value, index) => (
              <Grid item xs={6}>
                <Card sx={{ maxWidth: 345 }} key={index}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={value.img}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">{value.description}</Typography>
                </CardContent>
                </Card>
              </Grid>
            ))}
        </>
    )
}

export default Tarjeta;