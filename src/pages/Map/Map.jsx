import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";

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
  const [activeMarker, setActiveMarker] = useState(null);

  // API Key de Google
  const { isLoaded } = useLoadScript ({
    googleMapsApiKey: "AIzaSyCVLU4FFbvQ8g88L619Kj6nQ4YF0Bexrwg"
  });
  
  if (!isLoaded) {
    return "Hay un error"
  }
  
  // ubicación de cada HEB
  const markers = [
    {
      id: 1,
      name: "HEB Contry",
      position: { lat: 25.6271687, lng: -100.2750425 }
    },
    {
      id: 2,
      name: "HEB Cumbres",
      position: { lat: 25.73329797, lng: -100.3978786 }
    },
    {
      id: 3,
      name: "HEB Del Valle",
      position: { lat: 25.6505631, lng: -100.3608711 }
    },
    {
      id: 4,
      name: "HEB Estanzuela",
      position: { lat: 25.58734297, lng: -100.258748 }
    },
    {
      id: 5,
      name: "Yo",
      position: { lat: latitude, lng: longitude }
    }
  ];

  // Posición actual
  console.log(latitude + " " + longitude);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

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
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100vw", height: "100vh" }}
      center={{ latitude, longitude }}
      zoom={ 8 }
    >
      {markers.map(({ id, name, position }) => (
      <Marker
        key={id}
        position={position}
        onClick={() => handleActiveMarker(id)}
      >
        {activeMarker === id ? (
          <InfoWindow onCloseClick={() => setActiveMarker(null)}>
            <div>{name}</div>
          </InfoWindow>
        ) : null}
      </Marker>
    ))}
    </GoogleMap>
  );
}

export default Map;