import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import './map.css'
import { images } from '../../constants'
import AppBarHome from '../Home/components/AppBarHome'
import { Container, Box, Typography, Icon } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
// import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
// import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { database } from '../../FirebaseConfig'
import { getFirestore, addDoc, collection, getDocs, getDoc, doc, getCountFromServer, onSnapshot } from "firebase/firestore";

const mapTheme = createTheme({
    palette: {
        background: {
            default: "#ff5a5a"
        }
    }
})

// se inicializan las variables para la geolocalización
let latitude;
let longitude;

// geolocalización
const status = document.querySelector('.status');

const success = (position) => {
  console.log(position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

const error = () => {
  status.textContent = 'Échale ganas'
}

// obtener la posición actual
navigator.geolocation.getCurrentPosition(success, error);

const map = () => {
    



    // utilizado para los marcadores
    const [activeMarker, setActiveMarker] = useState(null);

    // API Key de Google
    const { isLoaded } = useLoadScript ({
      // googleMapsApiKey: "AIzaSyCVLU4FFbvQ8g88L619Kj6nQ4YF0Bexrwg"
    });
    
    if (!isLoaded) {
      return "Hay un error"
    }
    
    // ubicación de cada HEB
    const markers = [
      {
        id: 1,
        name: "HEB Contry",
        position: { lat: 25.6271687, lng: -100.2750425 },
        icon: images.logoHEB2 
      },
      {
        id: 2,
        name: "HEB Cumbres",
        position: { lat: 25.73329797, lng: -100.3978786 },
        icon: images.logoHEB2 
      },
      {
        id: 3,
        name: "HEB Del Valle",
        position: { lat: 25.6505631, lng: -100.3608711 },
        icon: images.logoHEB2 
      },
      {
        id: 4,
        name: "HEB Estanzuela",
        position: { lat: 25.58734297, lng: -100.258748 },
        icon: images.logoHEB2 
      },
      {
        id: 5,
        name: "Yo",
        position: { lat: latitude, lng: longitude },
      }
    ];
  
    // Posición actual
    console.log(latitude + " " + longitude);
    const center = { lat: latitude, lng: longitude }
  
    const handleActiveMarker = (marker) => {
      if (marker === activeMarker) {
        return;
      }
      setActiveMarker(marker);
    };
  
    // esperar 2 segundos
    function resolveAfter2Seconds(x) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(x);
        }, 2000);
      });
    }
  
    // poner marcadores
    const handleOnLoad = async (map) => {
      const bounds = new google.maps.LatLngBounds();
      markers.forEach(({ position }) => bounds.extend(position));
      map.fitBounds(bounds);
      var x = await resolveAfter2Seconds(10);
    };

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
                            <GoogleMap
                                onLoad={ handleOnLoad, resolveAfter2Seconds }
                                onClick={() => setActiveMarker(null)}
                                center={ center }
                                zoom={ 12 }
                                mapContainerStyle={{ width: "100%", height: "80vh" }}
                                options={{
                                  zoomControl: false,
                                  streetViewControl: false,
                                  mapTypeControl: false,
                                  fullscreenControl: false,
                                }}
                            >
                              {markers.map(({ id, name, position, icon }) => (
                              <Marker
                                key={ id }
                                position={ position }
                                onClick={() => handleActiveMarker(id)}
                                icon={ icon }
                              >
                                {activeMarker === id ? (
                                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                  <div>{ name }</div>
                                </InfoWindow>
                                ) : null}
                              </Marker>
                              ))}
                            </GoogleMap>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>

    )

}

export default map