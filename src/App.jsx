
import React, { useState } from 'react'
import ReactDOM from "react-dom/client"
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import Log from './pages/Login/Login'
import Lista from './pages/Lista/AppLista'
import Map from './pages/Map/map'
import Scan from './pages/Scan/scan'
import Productos from './pages/Productos/products'
import Recetas from './pages/Juego_Recetas/Recetas'
import WhatsTP from './pages/WhatsTP/WhatsTP'
import WTPJuego from './pages/WhatsTP/WTPJuego'
import Descuentos from './pages/Descuentos/descuentos'
import Receta from './pages/Receta/receta'
import Prueba from './Prueba'

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import Footer from './pages/Home/components/Footer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/login" element={<Log/>}></Route>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/lista" element={<Lista/>}></Route>
          <Route path="/sucursal" element={<Map/>}></Route>
          <Route path="/productos" element={<Productos/>}></Route>
          <Route path="/Scan" element={<Scan/>}></Route>

          <Route path="/recetas" element={<Recetas/>}></Route>

          <Route path="/Receta" element={<Receta/>}></Route>
          <Route path="/WhatsTP" element={<WhatsTP/>}></Route>
          <Route path="/WTPJuego" element={<WTPJuego/>}></Route>
          <Route path="/Prueba" element={<Prueba/>}></Route>
          <Route path="/descuentos" element={<Descuentos/>}></Route>
        </Routes>
      </Router> 
      </>
    );

  }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);