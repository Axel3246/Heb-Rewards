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

export default function App() {
  const[show, setShow] = useState(false)

  return (
    <div className="App">
      <AppBarList/>
      <button onClick={() => setShow(true) }>+</button>
      <Modal onClose={() => setShow(false)} show={show} />
      <ListaDiv/>
      <PrecioLista/>
      
    </div>
);
}