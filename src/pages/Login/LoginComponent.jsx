import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {Alert} from '@mui/material';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';
import GoogleIcon from '@mui/icons-material/Google';

const loginTheme = createTheme({
    palette: {
        theme: light
    }
})

const Login = () => {

  const navigate = useNavigate ();
  
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
        <ThemeProvider theme={loginTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        border: 1,
                        borderColor: 'white',
                        borderRadius: '16px',
                        boxShadow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 8,
                        px: 10,
                        py: 3
                    }}
                >
                    
                    <Avatar sx={{ m: 1 }}>
                        <LockOpenRoundedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Iniciar Sesión
                    </Typography>
                    <Box component="form"
                        sx={{
                            mt: 1
                        }}>

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
                        
                      <TextField
                          onChange={(e) => setPassword(e.target.value)}
                          margin="normal"
                          value={password}
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                      />
                        <br />
                        {
                        show?<Alert severity="error" sx={{mt: 2}}>¡Email o contraseña incorrectos!</Alert>:null
                        }
                        
                        <Button
                            type="submit"
                            onClick={signIn}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, background: '#ff3232'}}
                        >
                            Sign In
                        </Button>                        
                        <hr
                            style={{
                            background: '#696969',
                            color: '#696969',
                            borderColor: '#ffffff',
                            height: '1px',
                            marginBottom: '30px',
                            }}
                        />

                    </Box>
                    <Button variant="contained" startIcon={<GoogleIcon/>} size="medium" onClick={signInWithGoogle}> Iniciar con Google</Button>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Login

