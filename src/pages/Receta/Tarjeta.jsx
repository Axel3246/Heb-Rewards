import React, {useEffect, useState} from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';

import IconButton from '@mui/material/IconButton';

import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

import '../../pages/Lista/Modal.css'

import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { key } from 'localforage';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import {Divider} from '@mui/material';
import QRCode from 'react-qr-code';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const autho = getAuth();
const user = auth.currentUser;

const Tarjeta = ({ recetas, hideElements }) => {

  const location = useLocation();

  let receta = location.state;

  const [productos, setProductos] = useState([])
  const [newCode, setNewCode] = useState("")
  //const [termsValidation, setTermsValidation] = useState(false)
  //console.log(receta.productos.length)
  const [productosDescubiertos, setproductosDescubiertos] = useState(Array(receta.productos.length).fill(false));

  const actualizarElemento = (index) => {
    setproductosDescubiertos(prevproductosDescubiertos => {
      const nuevosproductosDescubiertos = [...prevproductosDescubiertos]; // Crear una copia del array existente
      nuevosproductosDescubiertos[index] = true; // Actualizar el valor del elemento deseado
      if (!(nuevosproductosDescubiertos.includes(false))) {
        setCompletado(true);
        console.log("ya quedó");
        hideElements(true);
        
      }
      return nuevosproductosDescubiertos; // Establecer el nuevo array como estado
      
    });
  };

  //let productosDescubiertos = new Array(receta.productos.length).fill(false);
  const [productoEncontradoID, setproductoEncontradoID] = useState("-1");
  const [uid, setUid] = useState("guest")
  const [QRInfo, setQRInfo] = useState(" ")

  const findCode =  (code) => { 
    var i = 0;
    productos.forEach(element => {
      if (element.codigo == code) {
        // Código encontrado
        actualizarElemento(i);
        
      }
      i++;
    });
  }

    
  useEffect(() => {
   
  
      console.log("Receta es esto:" , receta);
      const coll = collection(database, 'Productos');
      const q = query(coll, where(documentId(), 'in', receta.productos));

      const unsuscribe = onSnapshot(q, querySnapshot => {
        setProductos(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              url_imagen: doc.data().imagen, 
              nombre: doc.data().producto, 
              codigo: doc.data().upc
            })
          )
    
        )})
          return unsuscribe;
          console.log('run something here');
        
      //const q = query(collectionRef,  where("sucursal", '==', "ESL"));

  }, [])

  useEffect(() => {
    if (user != null) {
      const helper = user.uid.slice(0, 10);
      setUid(user.uid);
    } else {
      setUid("guest");
    }
}, [])

useEffect(() => {
  setQRInfo(uid+"-"+recetas.id+"-"+recetas.descuento)
  console.log(QRInfo)
}, [uid])

  const[show, setShow] = useState(false)
  const[showtf, setShowtf] = useState(false)
  const[completado, setCompletado] = useState(false)
  const hStyle = { color: 'black' , textAlign: "center"};

  const [data, setData] = useState("Capture : ...");

  const onUpdateScreen = (err, result) => {
    if (result) {
      findCode(result.text);
      setShow(false);
    }
  };

    return (
      <>
      {
        completado ? <div style={{alignItems : "center", marginTop : "100px"}} >

        <QRCode value={QRInfo} size={256} bgColor="#282c34" fgColor="#fff" level="H" /> 
        <Typography variant='h4' sx={{ fontWeight: 'bold', mt: 4, mb: 5 }}><span>¡Felicidades!</span> Canjea tu descuento en caja</Typography></div> : 
        <> {
      
          show ? <div className="App">
          <h1>Scan BarCode</h1>
          <>
            {show && (
              <BarcodeScannerComponent
                width={400}
                height={400}
                onUpdate={(err, result) => onUpdateScreen(err, result)}
              />
            )}
          </>
        </div> : <div style={{ display: 'flex', flexDirection: 'flex-column', width: '78%', flexWrap: 'wrap', overflowY: "visible", alignItems: "center", justifyContent: "center", position: 'relative' }}>
        
        <IconButton onClick = {() => { 
          if (showtf) {
            findCode(newCode);
            setShowtf(false);
            
          } else {
            setShowtf(true);
          }
        }
        }
                          size="large"
                          color="inherit"
                      >
                          <KeyboardIcon />
                          
                      </IconButton>
        <IconButton onClick={() => setShow(true) }
                          size="large"
                          color="inherit"
                      >
                          <PhotoCameraIcon />
                          
                      </IconButton>
                      <Divider sx={{width:"90%", mb:2}}></Divider>
                      {
                        showtf ? <TextField margin="normal"
                        onChange={(e) => setNewCode(e.target.value)}
                        required
                        fullWidth={true}
                        id="code"
                        label="Código"
                        name="code"
                        value={newCode}
                        autoComplete="code"
                        autoFocus
                    /> : null
                      }
        
  
      
          {productos.map((item) => (
            <Card key={item.id} sx={{ width: '160px', height: '200px', ml: 1, mr: 1, mb: 2}}>
  
            
            {
            
              
              productosDescubiertos.at(receta.productos.indexOf(item.id)) ?  
              <>
              <CardMedia
                sx={{ height: 140 }}
                image={item.url_imagen}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">Encontrado</Typography>
              </CardContent>
              </>
              : 
              <>
              <CardMedia
                sx={{ height: 140 }}
                image={item.url_imagen}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">{item.nombre}</Typography>
              </CardContent>
              </>
  
  
            }
            </Card >
          ))}
      </div>
        }
        </>
      }
      
      
      </>
    )
}

export default Tarjeta;