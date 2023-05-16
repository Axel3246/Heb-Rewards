// Tarjetas horizontales
// Lau Hdz 15/05/2023
import { React, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { images } from '../../constants';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export default function MediaControlCard() {
  const theme = useTheme();

  const [counter, setCounter] = useState(1);
 
  // Counter mas
  const increase = () => {
    setCounter(count => count + 1);
  };
 
  // Counter menos
  const decrease = () => {
    setCounter(count => count - 1);
  };

  return (
    <Container>
        <Grid
            sx={{ mt: 10 }}
            container
            justifyContent="space-evenly"
            spacing={4}
        >
            <Card sx={{ maxWidth: 600, display: 'flex' }}>
                
                <CardMedia
                    sx={{ width: 151 }}
                    image={images.holder_koopas}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Koopas
                        </Typography>
                    </CardContent>

                    <Box sx={{ display: 'flex',  alignItems: 'center', pl: 1, pb: 1 }}>
                        
                        <Typography component="div" variant="h8">
                            Cantidad
                        </Typography>

                        <IconButton aria-label="menos" onClick={decrease}>
                            {theme.direction === 'rtl' ? <RemoveCircleOutlineIcon /> : <RemoveCircleOutlineIcon />}
                        </IconButton>

                        <IconButton aria-label="cantidad">
                            <span className="counter__output">{counter}</span>
                        </IconButton>

                        <IconButton aria-label="mas" onClick={increase}>
                            {theme.direction === 'rtl' ? <AddCircleOutlineIcon /> : <AddCircleOutlineIcon />}
                        </IconButton>

                        <Typography component="div" variant="h6">
                            <span className="counter__output"> $00.00</span>
                        </Typography>

                        <IconButton aria-label="eliminar">
                            {theme.direction === 'rtl' ? <DeleteIcon color="disabled" /> : <DeleteIcon color="disabled"/>}
                        </IconButton>

                    </Box>

                    

                </Box>
            </Card>
        </Grid>
    </Container>
  );
}