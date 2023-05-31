import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { images } from '../../constants/'
import { database, auth } from '../../FirebaseConfig'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';
import './SignUp.css'

const SignUpTheme = createTheme({
    palette: {
        background: {
            default: "#ff5a5a"
        }
    }
})


const useStyles = styled((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMss, setError] = useState("");

    // POST usuario (SQL)
    function postUserData(email) {
        let url = `http://localhost:3000/programming-languages//postUsuario/'` + email + `'/1`;
        fetch(url, {method: 'get'})
        console.log("usuario agregado");
    } 

    const signUp = (e) => {
        e.preventDefault();
        if (nombre === "" || apellido === "")
        {
            setMessage("Datos faltantes. Inténtelo nuevamente.");
            setShow(true);
        }
        else{
            
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                postUserData(email);
                navigate("/");
            })
            .catch((error) => {
                if (error.message.includes("already in use"))
                {
                    setMessage("Este correo ya tiene una cuenta asociada.");
                }
                else if (error.message.includes("least 6 characters"))
                {
                    setMessage("Contraseña insegura. Incluye al menos 6 caracteres."); 
                }
                else 
                {
                    setMessage("Datos incorrectos. Inténtelo nuevamente.")
                }
                setShow(true);
                console.log(error);
            }); 
        }
        
    };   

    const classes = useStyles();

    return (
        <ThemeProvider theme={SignUpTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        border: 1, borderColor: 'white', borderRadius: '16px', boxShadow: 1, display: 'flex',
                        flexDirection: 'column', alignItems: 'center', mt: 8, px: 4, py: 3, background: '#ffffff',
                    }}>
                    <Box sx={{ mb: 2 }}>
                        <a href='/'><img src={images.heb}></img></a>
                    </Box>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: "center !important", fontFamily: 'Roboto', fontSize: 48 }}>
                        ¡Únete a HEB Rewards!
                    </Typography>
                    <Typography sx={{ textAlign: "center !important", mb: 1, fontSize: 16, fontWeight: 'regular', color: 'black' }}>
                        ¡Descubre una nueva forma de comprar con recompensas y diversión!
                        Por favor, ingresa tus datos para registrarte.
                    </Typography>
                    <Box component="form">
                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <TextField margin="normal"
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                        fullWidth={true}
                                        id="Nombre"
                                        label="Nombre"
                                        name="Nombre"
                                        value={nombre}
                                        autoComplete="Nombre"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField margin="normal"
                                        onChange={(e) => setApellido(e.target.value)}
                                        required
                                        fullWidth={true}
                                        id="Apellido"
                                        label="Apellido"
                                        name="Apellido"
                                        value={apellido}
                                        autoComplete="Apellido"
                                        autoFocus />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField margin="normal"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        fullWidth={true}
                                        id="email"
                                        label="Correo Electrónico"
                                        name="email"
                                        value={email}
                                        autoComplete="email"
                                        autoFocus />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={(e) => setPassword(e.target.value)}
                                        margin="normal"
                                        value={password}
                                        required
                                        fullWidth
                                        name="password"
                                        type="password"
                                        id="password"
                                        label="Contraseña"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <br />
                    </Box>
                    {show ? <Alert severity="error" sx={{ mt: 2 }}>{message}</Alert> : null}
                    <Button
                        type="submit"
                        onClick={signUp}
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2, background: '#ff3232 !important', fontSize: 16 }}>
                        Registrarse
                    </Button>
                    <Box sx={{ fontWeight: 'light', m: 1, fontSize: 14, mb: 2 }}>
                        ¿Ya tienes cuenta? <a className="link" href="/login">Ingresa Aquí</a>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignUp;