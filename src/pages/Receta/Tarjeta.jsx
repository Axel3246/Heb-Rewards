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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


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

//Imports Modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Zoom from '@mui/material/Zoom'; //Para animacion
import { Block, OpenInBrowserOutlined } from '@mui/icons-material';


import './receta.css'
import Container from '@mui/material/Container';



//Modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center'
};


var correo;
//const autho = getAuth();
//const user = auth.currentUser;

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
        setOpen(true);
        console.log("ya quedó");
        
      }
      return nuevosproductosDescubiertos; // Establecer el nuevo array como estado
      
    });
  };

  //let productosDescubiertos = new Array(receta.productos.length).fill(false);
  const [productoEncontradoID, setproductoEncontradoID] = useState("-1");
  const [uid, setUid] = useState("guest")
  const [QRInfo, setQRInfo] = useState(" ")

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        correo = user.email;
        fetch("https://api-heb-rewards.ricardojorgejo1.repl.co/api/getId/'" + correo + "'")
        .then(response => {
          return response.json()
        })
        .then(data => {
          setUid(data[0].usuarioID);
          console.log(data[0].usuarioID);
        })
      }
    });
  }, []);

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



  

  const[show, setShow] = useState(false)
  const[showtf, setShowtf] = useState(false)
  const[completado, setCompletado] = useState(false)
  const hStyle = { color: 'black' , textAlign: "center"};

  const [data, setData] = useState("Capture : ...");

  useEffect(() => {
    setQRInfo(uid+"-"+recetas.id+"-"+recetas.descuento);
    if (completado) {
      let url = "https://api-heb-rewards.ricardojorgejo1.repl.co/api/postDescuento/"+ uid +"/1/" + recetas.id + "/" + recetas.descuento;
      console.log(url);
      fetch(url, { method:"get" });
    }
  }, [uid, completado])

  const onUpdateScreen = (err, result) => {
    if (result) {
      findCode(result.text);
      setShow(false);
      hideElements(false);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClosetf = () => setShowtf(false);
  const [manualText, setManualText] = useState("Ingresar manualmente");


  return (
    <>
      {

        completado ? 

        <Modal open={open} onClose={handleClose}>
        
          <Box sx={style}>
            <div style={{alignItems : "center", marginTop : "20px"}} >
            <QRCode value={QRInfo} size={160} bgColor="#282c34" fgColor="#fff" level="H" /> 
            <Typography variant='h4' sx={{ fontWeight: 'bold', mt: 3}}><span>¡Felicidades!</span> Canjea tu descuento en caja</Typography></div>
          </Box>

        </Modal> : 

        <> 
          
        {
      
          show ? <div className="App">

          
          <>
            {show && (
              <BarcodeScannerComponent onUpdate={(err, result) => onUpdateScreen(err, result)}/>
            )}
          </>

          
          <Button  variant="contained" onClick = {() => { 
            setShow(!show);
            hideElements(false);
            setShowtf(false);
            setManualText("Ingresar manualmente")
            } } sx={{bgcolor: "#F3231F", display: 'Block', m: 'auto', mt: '25px'}}>
              Cerrar
          </Button>
          
          

          <Button sx={{position: 'fixed',bottom: 80, left: 0, textTransform: 'none', maxWidth: '300px'}} onClick = {() => { 
            if (showtf) {
              setShowtf(false);
              setManualText("Ingresar manualmente"); // ya no es necesario
            } else {
              setShowtf(true);
              setManualText("Cerrar ingreso manual")
            }
            }} >
              <Typography>Escanea el producto deseado.<br/> <u>Ingresar manualmente</u></Typography>

          </Button>

          <Modal open={showtf} onClose={handleClosetf}>
            <Box sx={style}>
            <Typography variant='h6'>Codigo del producto</Typography>
            <TextField margin="normal"
                onChange={(e) => setNewCode(e.target.value)}
                required
                fullWidth={true}
                id="code"
                label="Código"
                name="code"
                value={newCode}
                autoComplete="code"
                autoFocus
              /> 
              <Button variant="contained" onClick = {() => { 
                setShow(!show);
                hideElements(false);
                findCode(newCode);
                } } sx={{bgcolor: "#F3231F", mt: 2}}>
                  Ingresar Codigo
              </Button>
            </Box>
          </Modal>
          


        
        

        </div> : <div style={{ display: 'flex', flexDirection: 'flex-column', width: '100%', flexWrap: 'wrap', overflowY: "visible", alignItems: "center", justifyContent: "center", position: 'relative' }}>
        

          <Button variant="contained" onClick={() => {setShow(true); hideElements(true);}} sx={{bgcolor: "#F3231F", mb: 2}}>Escanear codigo</Button>


          <Divider sx={{width:"90%", mb:2}}/>
        
        
          {productos.map((item) => (
            <Card key={item.id} sx={{ width: '150px', height: '200px', ml: 1, mr: 1, mb: 2, position: 'relative'}}>
            
            <CardMedia sx={{ height: 140 , objectFit: 'cover'}} image={item.url_imagen}/>

            <CardContent>
              <Typography variant="body2" color="text.secondary">{item.nombre}</Typography>
            </CardContent>
            
            {
              productosDescubiertos.at(receta.productos.indexOf(item.id)) ? <><Box sx={{position: 'absolute', zIndex: 10, bgcolor: '#fff', width: '160px', height: '200px', bottom: '0px', opacity: '0.6  '}}><CheckCircleOutlineIcon sx={{color: '#58b56c', mt: '75px', width: '50px', height: '50px'}}/></Box></> : null
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