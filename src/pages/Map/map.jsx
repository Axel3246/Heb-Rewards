import React from 'react'
import './map.css'
import { images } from '../../constants'
import AppBarHome from '../Home/components/AppBarHome'
import { Container, Box, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';

const mapTheme = createTheme({
    palette: {
        background: {
            default: "#ff5a5a"
        }
    }
})

const map = () => {
    return (
        <>
            <ThemeProvider theme={mapTheme} >
                <AppBarHome />
                <Container component="main" maxWidth="m">
                    <Box sx={{
                        border: 1, borderColor: 'white', borderRadius: '16px', boxShadow: 3, display: 'flex', flexDirection: 'column', mt: 19, px: 6, py: 3, background: '#ffffff'
                    }}>
                        <Box sx={{ mb: 2 }}>
                            <MapIcon sx={{ fontSize: 40, color: '#ff3232' }} />
                        </Box>
                        <Box>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: "center !important", fontFamily: 'Roboto', fontSize: 48 }}>
                                ¡Elige tu sucursal preferida!
                            </Typography>
                            <Typography sx={{ textAlign: "center !important", mb: 1, fontSize: 17, fontWeight: 'regular' }}>
                                Para facilitar tu experiencia con nosotros, ¡puedes elegir tu sucursal preferida aquí! <br/> ¡Explora nuestras opciones y elige la sucursal que mejor se adapte a tus necesidades!
                            </Typography>
                        </Box>
                        <Box>
                            <iframe width="800px" height="400px" src="https://clausa.app.carto.com/map/cf8f3d90-1991-4dea-8304-632ac360c9b7"></iframe>
                        </Box>

                    </Box>
                </Container>
            </ThemeProvider>
        </>

    )

}

export default map