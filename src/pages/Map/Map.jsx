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

// obtener la posición actual e imprimirla
navigator.geolocation.getCurrentPosition(success, error);
console.log(latitude + " " + longitude);

// función para poner el mapa
function initMap(){
  // opciones
  var options = {
    center: {lat: latitude, lng: longitude},
    zoom: 8
  }
  // nuevo mapa
  map = new google.maps.Map(document.getElementById("map"),options)
}

// función principal
function Map() {
  return (
    <>
      <div id="map"></div>
      <script defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVLU4FFbvQ8g88L619Kj6nQ4YF0Bexrwg&callback=initMap">
      </script>
    </>
  );
}

export default Map;

