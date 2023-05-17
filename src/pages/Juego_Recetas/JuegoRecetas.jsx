//recetas
import { images } from '../../constants'
import '../Home/Home.css'
import AppBarHome from '../Home/components/AppBarHome.jsx'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
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
      
          )})
            return unsuscribe;
    },[])

    console.log(rows)
    //rows.forEach(element => console.log(element));
    
    return (
        
        <>

            <AppBarHome />
            <Container>
                
                <Grid
                    sx={{ mt: 18 }}
                    container
                    justifyContent="space-evenly"
                    spacing={4}
                >
                    <TarjetaReceta details={rows} />
                </Grid>
            </Container >
        </>
            

    )
}

export default JuegoRecetas
