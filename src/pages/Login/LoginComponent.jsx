import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import { images } from '../../constants/'
import './Login.css'



const loginTheme = createTheme({
    palette: {
        background: {
            default: "#ff5a5a"
        }
    }
})


const Login = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                navigate('/home', { replace: true });
            })
            .catch((error) => {
                setShow(true);
                setMessage(error);
                console.log(error);
            });
    };

    return (
        <ThemeProvider theme={loginTheme} >
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box sx={{
                    border: 1, borderColor: 'white', borderRadius: '16px', boxShadow: 1, display: 'flex',
                    flexDirection: 'column', mt: 12, px: 6, py: 3, background: '#ffffff'
                }}>
                    <Box sx={{mb: 2}}>
                    <img src={images.heb}></img>
                    </Box>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: "left !important", fontFamily: 'Roboto', fontSize: 48 }}>
                        ¡Bienvenido de Nuevo!
                    </Typography>
                    <Typography  sx={{textAlign: "left !important", mb: 1, fontSize: 17, fontWeight: 'regular'}}>
                    ¡Comienza a ahorrar con HEB Rewards!
                    <br></br> Por favor, ingresa tus datos para acceder.
                    </Typography>
                    <Box component="form" sx={{ mt: '0.5 rem', alignItems: 'center' }}>
                        <TextField margin="normal"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth={true}
                            id="email"
                            label="Correo Electrónico"
                            name="email"
                            value={email}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            value={password}
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <br />
                        {show ? <Alert severity="error" sx={{ mt: 2 }}>¡Email o contraseña incorrectos!</Alert> : null}
                        <Button type="submit" onClick={signIn} fullWidth variant="contained" sx={{ mt: 2, mb: 1, background: '#ff3232', fontSize: 16 }}>
                            <Typography variant='p'>Iniciar Sesión</Typography>
                        </Button>
                        <Box sx={{ fontWeight: 'light', m: 1, fontSize: 14, mb: 2 }}>
                            ¿No tienes cuenta? Registrate
                        </Box>
                        <hr style={{ background: '#696969', color: '#696969', borderColor: '#ffffff', height: '1px', marginBottom: '5px' }} />
                    </Box>
                    <Box sx={{ fontWeight: 'light', m: 1, mb: 2, fontSize: 14 }}>
                        Tambien puedes ingresar con:
                    </Box>
                    <Button variant="contained" startIcon={<GoogleIcon />} size="medium" onClick={signInWithGoogle} sx={{ background: '#ff3232', color: '#ffffff', fontSize: 16, mb: 1 }}> Ingresar con Google</Button>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Login

