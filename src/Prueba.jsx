import React from 'react';
import './TuComponente.css'; // Archivo CSS para estilos personalizados

import imagenPNG from './Gelatina.png'; // Ruta de la imagen PNG
import imagenNegra from './negro.jpg'; // Ruta de la imagen negra
import imagenMario from './Mario.png';

const Prueba = () => {
  return (
    <div className="contenedor">
      <div className="imagen-png-container">
        <img src={imagenPNG} alt="Imagen PNG" className="imagen-negra"/>
        <img src={imagenPNG} alt="Imagen Negra" className="imagen-png2"/>
      </div>
    </div>
  );
}

export default Prueba;