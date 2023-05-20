// Se importa React
import React, { useState } from 'react';

// Se importa el archivo Modal
import Modal from './Modal';
import AppBarList from './AppBarList';
import DataTable from './tabla';
import TarjetasLista from './TarjetasLista';
import Pruebatarjeta from './Pruebatarjeta';
import ListaDiv from './ListaDiv';
import PrecioLista from './PrecioLista';
import AlertaEliminar from './AlertaEliminar';

export default function App() {
  const[show, setShow] = useState(false)

  return (
    <div className="Content">
      <AppBarList/>
      <ListaDiv/>
      
    </div>
);
}