// Se importa React
import React, { useEffect, useState} from 'react';
import { Alert } from '@mui/material';
import { auth } from '../../FirebaseConfig'

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
  const [show, setShow] = useState(false)
  const [userExist, setUserExist] = useState(false)



  
  useEffect( async ()  => {

    const unsubscribe = await auth.onAuthStateChanged(user => {
      if (user) {
        setUserExist(true);
      }
    })

    return unsubscribe
  }, [])

  
  return (
    <div className="Content">
      <AppBarList/>
      {
        userExist ? <> <ListaDiv/> <PrecioLista/> </>: <Alert variant="filled" severity="error">
        ¡Debes iniciar sesión para usar esta función!
      </Alert>
      }
      
      
      
    </div>
);
}