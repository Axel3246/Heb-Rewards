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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function JuegoRecetas() {
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
                    <Grid item sx={{ textAlign: 'center', }}>
                        <Card sx={{ maxWidth: 345 }/*, object-fit={contain}*/}>
                            <CardActionArea href='/productos'>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={images.asado}
                                    object-fit="contain"
                                    //sx={{ maxLength: "0.5" }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Asado de puerco
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item sx={{ textAlign: 'center', }}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea href='/productos'>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={images.tacospiedra}
                                    object-fit="contain"
                                    //sx={{ maxLength: "100px" }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Tacos piedra
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item sx={{ textAlign: 'center', }}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea href='/productos'>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={images.pozole}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Pozole de camarón
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item sx={{ textAlign: 'center', }}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea href='/productos'>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={images.quesadilla}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Quesadillas sin queso
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container >
        </>
            

    )
}

export default JuegoRecetas
