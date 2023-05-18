//recetas
import { images } from '../../constants'
import '../Home/Home.css'
import AppBarHome from '../Home/components/AppBarHome.jsx'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getFirestore, addDoc, collection, getDocs, getDoc, doc, getCountFromServer, onSnapshot } from "firebase/firestore";
import TarjetaReceta from './tarjetaReceta';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));





function JuegoRecetas() {
    const [rows, setRows] = useState([])

    useEffect(() => {
        const coll = collection(database, 'Recetas');
        const unsuscribe = onSnapshot(coll, querySnapshot => {
            setRows(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    url_imagen: doc.data().imagen,
                    nombre: doc.data().nombre,
                    productos: doc.data().productos
                })
                )

            )
        })
        return unsuscribe;
    }, [])
    console.log(rows)
    //rows.forEach(element => console.log(element));

    return (
        <>
            <Container sx={{ alignItems: 'center' }}>
                <AppBarHome />
                <Box maxWidth='sm' sx={{ mt: 15 }}>
                <Typography variant='h4' sx={{ fontWeight: 'bold' }}><span>Dine</span> n' Dash!</Typography>
                <Typography variant='h4' sx={{ fontWeight: '1', fontSize: 16, mb: 4 }}>Elige, escanea y <span>¡gana!</span></Typography>
                    <Grid
                        container
                        justifyContent="space-evenly"
                        spacing={4}
                        alignItems='center'
                    >
                        <TarjetaReceta details={rows} />
                    </Grid>
                </Box>
            </Container >
        </>
    )
}

export default JuegoRecetas
