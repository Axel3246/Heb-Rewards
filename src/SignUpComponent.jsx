import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { database, auth } from './FirebaseConfig'
import { useNavigate  } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'; 
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';
import { red } from '@mui/material/colors';

const SignUpTheme = createTheme({
  palette: {
      theme: light
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


  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/SignIn");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={SignUpTheme}>
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
                        px: 4,
                        py: 3
                    }}
                >
                    
                    <Avatar sx={{ m: 1 }}>
                        <LockOpenRoundedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Crea tu cuenta
                    </Typography>
                    <Box component="form"
                        sx={{
                            mt: 1
                        }}>
        <div className={classes.root}>
      <Grid container spacing={3}>
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
            autoFocus />
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
              label="Password"
              autoComplete="current-password"
          />
        </Grid>
      </Grid>
    </div>
        <br />
        <Button
                            type="submit"
                            onClick={signUp}
                            style={{maxWidth: 200}}
                            variant="contained"
                            sx={{ mt: 3, mb: 2, background: '#ff3232'}}
                        >
                            Sign Up
                        </Button>
        </Box>



      </Box>
      </Container>

      </ThemeProvider>
  );
};

export default SignUp;