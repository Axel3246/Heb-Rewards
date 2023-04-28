import { images } from '../../constants'
import './Home.css'
import AppBarHome from './components/AppBarHome.jsx'
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

function Home({user}) {
    {/*
    const navigate = useNavigate();

    const navigateToContacts = () => {
        // to login
        navigate('/login');
    };*/}

    //No sabia que esto se tenia que comentar tambien (preguntar)

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
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea href='/productos'>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    image={images.holder_koopas}
                                    
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Mejores Descuentos 1
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid item>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={images.holder_koopas}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Mejores Descuentos 2
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={images.holder_koopas}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Mejores Descuentos 3
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={images.holder_koopas}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Mejores Descuentos 4
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                {/* <h1>Hello, <span></span>{user.displayName}</h1>
                <img src={user.photoURL} alt="" />
                <button className="button signout" onClick={() => auth.signOut()}>Sign out</button> */}
            </Container >
        </>
    )
}

export default Home
