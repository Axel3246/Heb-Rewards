import React, { useState, useEffect, useMemo } from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import './map.css'
import { images } from '../../constants'
import AppBarHome from '../Home/components/AppBarHome'
import { Container, Box, Typography, Icon } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import { database } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion  } from 'firebase/firestore';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import LocalMallIcon from  '@mui/icons-material/LocalMall';
import { getAuth } from "firebase/auth";
import { CircularProgress } from '@mui/material';



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
  console.log('Ayuda')
}

// obtener la posición actual
navigator.geolocation.getCurrentPosition(success, error);

// Función principal 
const map = () => {

  const [stores, setStores] = useState([]);
  const [sucursales, setSucursales] = useState([]); // get de las sucursales para el mapa  
  const [nombre, setNombre] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null); // utilizado para los marcadores

  // Obtener el email del usuario
  // Hacer el GET de la sucursal
  var correo
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        fetchUserData(user.email);
        console.log("info recuperada");
      }
    });
  }, [])

  const fetchUserData = (correo) => {
    fetch(`http://localhost:3000/programming-languages/getStoreName/'` + correo + `'`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setStores(data) 
      })
  }
  
  // Put Sucursal (SQL)
  function changeUserData(prop) {
    document.getElementById("perry").innerHTML = prop;
    let url = `http://localhost:3000/programming-languages/putSucursal/'` + prop + `'/'` + correo + `'`;
    // console.log(prop);
    fetch(url, {method: 'get'})
    console.log("cambio realizado");
  }

  // query de firebase
  var q;

  useEffect(() => {
    const coll = collection(database, 'SucursalesHEBMTY');
    q = query(coll);

    const unsuscribe = onSnapshot(q, querySnapshot => {
      setSucursales(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          ciudad: doc.data().ciudad,
          direccion: doc.data().direccion,
          horario: doc.data().horario,
          latitud: doc.data().latitud,
          longitud: doc.data().longitud,
          nombre: doc.data().nombre,
        }))   
    )})
    console.log("información de sucursales")
    return unsuscribe;
  }, [nombre])

  // API Key de Google
  const { isLoaded } = useLoadScript ({
    googleMapsApiKey: "AIzaSyCVLU4FFbvQ8g88L619Kj6nQ4YF0Bexrwg"
  });
    
  if (!isLoaded) {
    return "Hay un error"
  }
    
  // ubicación de cada HEB (de manera manual)
  const markers = [
    {
      id: 0,
      name: "Ubicación actual",
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
  
  // poner marcadores (utilizando un diccionario)
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
                      border: 1, borderColor: 'white', borderRadius: '1px', boxShadow: 3, display: 'flex', flexDirection: 'column', mt: 19, px: 3, py: 1.5, background: '#ffffff'
                  }}>
                      <Box sx={{ mb: 2 }}>
                          <MapIcon sx={{ fontSize: 40, color: '#ff3232' }} />
                      </Box>
                      <Box>
                          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: "center !important", fontFamily: 'Roboto', fontSize: 48, color: "black !important"}}>
                              ¡Elige tu sucursal preferida!
                          </Typography>
                          <Typography sx={{ textAlign: "center !important", mb: 1, fontSize: 17, fontWeight: 'regular', color: "black !important" }}>
                              Para facilitar tu experiencia con nosotros, ¡puedes elegir tu sucursal preferida aquí! <br/> ¡Explora nuestras opciones y elige la sucursal que mejor se adapte a tus necesidades!
                              {stores.map(user => (
                                <h4 id="perry">{user.nombre}</h4>
                              ))}
                          </Typography>
                      </Box>
                      <Box>
                          <GoogleMap
                              // onLoad={ handleOnLoad  }
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
                            {/*Sucursales de HEB (obtenidas de Firebase)*/}
                            {sucursales.map((item) => (                          
                            <Marker
                              key={ item.id }
                              position={{ lat: item.latitud, lng: item.longitud }}
                              icon={ images.logoHEB2 }
                              onClick={() => handleActiveMarker(item.id)}
                            >
                            {activeMarker === item.id ? (
                              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <div>
                                  <h4>{ item.nombre }</h4>
                                  { item.direccion }
                                  <br />
                                  {/*Update de la información*/}
                                  {/*<button onClick={changeUserData}>Seleccionar</button>*/}
                                  <Box sx={{ height: 90, transform: 'translateZ(0px)', flexGrow: 1 }}>
                                    <SpeedDial
                                      ariaLabel="SpeedDial openIcon example"
                                      sx={{ position: 'absolute', bottom: 16, right: 16, severity: 'error' }}
                                      icon={<LocalMallIcon />}
                                      onClick={() => changeUserData(item.nombre)}
                                      FabProps={{
                                        sx: {
                                          bgcolor: '#ff3232',
                                          '&:hover': {
                                            bgcolor: '#ff3232',
                                          },
                                        }
                                      }}
                                    >
                                    </SpeedDial>
                                 </Box>
                                </div>
                              </InfoWindow>
                              ) : null}
                            </Marker>
                            ))}
                            
                            {/*Ubicación actual de la persona*/}
                            {markers.map(({ id, name, position }) => (
                            <Marker
                              key={ id }
                              position={ position }
                              onClick={() => handleActiveMarker(id)}
                              icon={ images.ubicacion }
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