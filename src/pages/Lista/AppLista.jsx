// Se importa React
import React, { useState, useEffect } from 'react';

// Se importa el archivo Modal
import Modal from './Modal';
import AppBarList from './AppBarList';
import DataTable from './tabla';
import readUserData from './tabla';

export default function App() {


  //readUserData();


  //useEffect(() => {
    // 👇️ only runs once
    //console.log('useEffect ran');
    //readUserData();
  //}, []);
  

  const[show, setShow] = useState(false)
  return (
    
    <div className="App">
      <AppBarList/>
      <button onClick={() => setShow(true) }>+</button>
      <Modal onClose={() => setShow(false)} show={show} />
      <DataTable/>
    </div>
    

);
}