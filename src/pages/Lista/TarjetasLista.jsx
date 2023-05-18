// Tarjetas verticales
// Lau Hdz 15/05/2023
import { React, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { images } from '../../constants';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MediaCard() {
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
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={images.holder_koopas}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            Koopas
                        </Typography>

                        <Box sx={{ display: 'flex',  alignItems: 'center', pl: 1, pb: 1 }}>
                        
                            <Typography component="div" variant="h6" color="text.secondary">
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

                        </Box>

                    </CardContent>
                </Box>

                <CardActions>
                    <Typography component="div" variant="h6" color="text.secondary">
                        Precio $00.00
                    </Typography>

                    <IconButton edge="end">
                        <DeleteIcon color="disabled" />
                    </IconButton>

                </CardActions>
                
            </Card>
        </Grid>
    </Container>
  );
}