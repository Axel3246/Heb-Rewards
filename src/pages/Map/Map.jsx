import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader, useLoadScript } from "@react-google-maps/api";

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

// función principal
function Map() {
  // centro del mapa basado en la posición actual
  console.log(latitude + " " + longitude);
  const centro = { lat: latitude, lng: longitude }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCVLU4FFbvQ8g88L619Kj6nQ4YF0Bexrwg" // Add your API key
  });

  return isLoaded ? <Map/> : null;

  return (
    <Box poition='absolute' left={0} top={0} h='100%' w='100%'>
      <GoogleMap 
        center={ centro } 
        zoom={ 8 } 
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
      </GoogleMap>
    </Box>
  )
}

export default Map;