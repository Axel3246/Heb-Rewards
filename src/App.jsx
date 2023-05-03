import { useState } from 'react'
import { Home, Login, Map } from './pages'
import { Button, Alert, Stack } from '@mui/material'
import { useLoadScript } from "@react-google-maps/api";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0)


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCVLU4FFbvQ8g88L619Kj6nQ4YF0Bexrwg" // Add your API key
  });
  
  return isLoaded ? <Map/> : null;
      {/* <Home/> */}
      {/* <Login/> */}
  
}
