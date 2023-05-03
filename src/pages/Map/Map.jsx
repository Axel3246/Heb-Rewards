import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

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

console.log(latitude + " " + longitude);

// función principal
function Map() {

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: {lat: latitude, lng: longitude},
  });

  const marker = new google.maps.Marker({
    position: {lat: latitude, lng: longitude},
    map: map,
  });
    
  map = new google.maps.Map(document.getElementById("map"),options)

  return (
    <>
      <h1>Mapa</h1>
      <div id="map"></div>
      <script async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVLU4FFbvQ8g88L619Kj6nQ4YF0Bexrwg&callback=Map">
      </script>
    </>
  );
}

export default Map;

