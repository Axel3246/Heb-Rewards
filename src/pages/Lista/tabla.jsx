import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, getDoc, doc, getCountFromServer, onSnapshot } from "firebase/firestore";
import { database } from '../../FirebaseConfig'
import { useEffect, useState } from 'react';


const columns = [
    { field: 'id_p', headerName: 'ID', width: 70 },
    { field: 'producto', headerName: 'Producto', width: 130 },
    { field: 'cantidad', headerName: 'Cantidad (gr)', width: 200 },
    { field: 'precio', headerName: 'Precio', width: 130},
];

const rows = [
    
];



/*
const readData = async (props) => {
    //console.log(i);
    const docRef = doc(database, "listaXD", "1");
    const querySnapshot =  await getDoc(docRef);
    console.log(querySnapshot.data());
    props.push(['{id: querySnapshot.data().id, producto: querySnapshot.data().producto, cantidad: querySnapshot.data().cantidad, precio: querySnapshot.data().precio}']);
}*/
/*
for (let i = 1; i < counter+1; i++) {
    //console.log(i);
    /*const docRef = doc(database, "listaXD", i);
    const querySnapshot =  await getDoc(docRef);
    console.log(querySnapshot.data());
    rows.push({id: querySnapshot.data().id, producto: querySnapshot.data().producto, cantidad: querySnapshot.data().cantidad, precio: querySnapshot.data().precio});
}*/



/*
const querySnapshot = await getDocs(collection(database, "listaXD"));
console.log(querySnapshot.data());*/

/*
const docRef = doc(database, "listaXD", "1");
const querySnapshot =  await getDoc(docRef);
console.log(querySnapshot.data());
rows.push({id: querySnapshot.data().id, producto: querySnapshot.data().producto, cantidad: querySnapshot.data().cantidad, precio: querySnapshot.data().precio});
*/

/*
querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log({id: doc.data().id, producto: doc.data().producto, cantidad: doc.data().cantidad, precio: doc.data().precio})
    });*/




export default function DataTable() {
    /*const handleClick = () => {
        readUserData();
      };*/
    const [rows, setRows] = useState([])
    
    useEffect(() => {
        const coll = collection(database, 'listaXD');
        const unsuscribe = onSnapshot(coll, querySnapshot => {
            setRows(
              querySnapshot.docs.map(doc => ({
                id: doc.id,
                id_p: doc.data().id_p, 
                producto: doc.data().producto, 
                cantidad: doc.data().cantidad, 
                precio: doc.data().precio
              })
            )
      
          )})
            console.log("Vuelve a repetir")
            return unsuscribe;
    },[])
    
    return (
        
        <div /*onLoad={handleClick()}*/ style={{ marginTop: 70, height: 400, width: '99%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={{ page: 0, pageSize: 9 }}
            checkboxSelection
        />
        </div>
    );
}

/*
export async function readUserData(){
    //console.log("Hello world!");
    //console.log('useEffect ran');
    const querySnapshot = await getDocs(collection(database, "listaXD"));
    //rows.push( { id: 5, producto: 'Pastelito Zebra', cantidad: '369 Gr', precio: 82 });
    //rows = Object.assign([], rows);
    //rows.push({ id: 5, producto: 'Pastelito Zebra', cantidad: '369 Gr', precio: 82 });
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log({id: doc.data().id, producto: doc.data().producto, cantidad: doc.data().cantidad, precio: doc.data().precio})
        //console.log(doc.data());
        
        //rows.push({id: doc.data().id, producto: doc.data().producto, cantidad: doc.data().cantidad, precio: doc.data().precio});
        //rows.push(doc.data());
    });
}*/