import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 41.881832, lng: -87.623177 }
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 }
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 34.052235, lng: -118.243683 }
  },
  {
    id: 4,
    name: "New York, New York",
    position: { lat: 40.712776, lng: -74.005974 }
  }
];

function Maps() {
  const [activeMarker, setActiveMarker] = useState(null);

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

  const handleOnLoad = async (map) => {
    const bounds = new google.maps.LatLngBounds();
    //waitthis();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
    var x = await resolveAfter2Seconds(10);
  };

  //function waitthis(){
  //  return (setTimeout(() => {
  //    console.log('Espera'), 1000
  //  }, 1000))
  //};

  
  
  

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100vw", height: "100vh" }}
    >
    //waitthis();
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

export default Maps;

