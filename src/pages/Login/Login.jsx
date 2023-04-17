import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded'; import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';
import { red } from '@mui/material/colors';

const loginTheme = createTheme({
    palette: {
        theme: light
    }
})


function Login() {
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
                            required
                            fullWidth={true}
                            id="email"
                            label="Correo Electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, background: '#ff3232'}}
                        >
                            Sign In
                        </Button>


                    </Box>



                </Box>
            </Container>

        </ThemeProvider>
    )
}


export default Login