// Pagina juego WTP
// Axel Hdz, Lau Hdz y Ricardo Rdz 25/05/2023
import React, { useEffect, useState } from "react";
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, getCountFromServer, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CircularProgress } from '@mui/material';
import { useLocation } from "react-router-dom";
import { Container, Box, Card, CardMedia } from "@mui/material";
import { images } from "../../constants";
// Se importan documentos de componentes
import JuegoAppBar from '../WhatsTP/components/JuegoAppBar'
import Pistas from '../WhatsTP/components/Pistas'
import "./WhatsTP.css";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import {Divider} from '@mui/material';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import QRCode from 'react-qr-code';


// Modal style
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

const WTPJuego = ({  }) => {

  // Hooks declaration
  const location = useLocation();
  let receta = location.state;

  const user = auth.currentUser;
  const [cargarProd, setCargarProd] = useState(false);
  const [cargarPist, setCargarPist] = useState(false);
  const [done, setDone] = useState(false);
  const [productos, setProductos] = useState([]);
  const [pistas, setPistas] = useState([]);

  const [show, setShow] = useState(false)
  const [showtf, setShowtf] = useState(false)
  const [completado, setCompletado] = useState(false)
  const [newCode, setNewCode] = useState("")
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false);
  const handleClosetf = () => setShowtf(false);

  const [hide, setHide] = useState(false);
  const [QRInfo, setQRInfo] = useState(" ")
  const [uid, setUid] = useState("guest")
  const [descuento, setDescuento] = useState(0)

  const [imageStyle, setImageStyle] = useState({});

  

  useEffect(() => {
    const newStyle = {
      position: 'absolute',
      zIndex: '2',
      filter: 'brightness(0%)',
      width: '300px',
      height: '210px',
      objectFit: 'none',
      bottom: '0',
      left: '0',
      objectFit: 'contain',
    };

    const newStyle1 = {
      position: 'absolute',
      zIndex: '2',
      filter: 'brightness(0%)',
      width: '300px',
      height: '210px',
      objectFit: 'none',
      bottom: '0',
      left: '0',
      objectFit: 'contain',
      clipPath: 'polygon(57% 9%, 100% 0, 86% 62%, 100% 100%, 63% 85%, 32% 100%, 0 100%, 18% 45%, 0 0)', 

    };

    const newStyle2 = {
      position: 'absolute',
      zIndex: '2',
      filter: 'brightness(0%)',
      width: '300px',
      height: '210px',
      objectFit: 'none',
      bottom: '0',
      left: '0',
      objectFit: 'contain',
      clipPath: 'polygon(41% 20%, 100% 0, 75% 53%, 100% 100%, 69% 75%, 35% 90%, 9% 91%, 21% 58%, 0 0)', 
     
    };

    const newStyle3 = {
      position: 'absolute',
      zIndex: '2',
      filter: 'brightness(0%)',
      width: '300px',
      height: '210px',
      objectFit: 'none',
      bottom: '0',
      left: '0',
      objectFit: 'contain',
      clipPath: 'polygon(41% 25%, 79% 21%, 68% 49%, 91% 87%, 69% 75%, 35% 80%, 9% 91%, 26% 54%, 10% 16%)', 
    };

    const newStyle4 = {
      position: 'absolute',
      zIndex: '2',
      filter: 'brightness(0%)',
      width: '300px',
      height: '210px',
      objectFit: 'none',
      bottom: '0',
      left: '0',
      objectFit: 'contain',
      clipPath: 'polygon(56% 41%, 71% 34%, 63% 50%, 75% 64%, 67% 67%, 47% 51%, 23% 78%, 37% 44%, 26% 30%)',  
    };

    setImageStyle(newStyle);

    if (descuento == 40) {
      setImageStyle(newStyle1);
    } else if (descuento == 30) {
      setImageStyle(newStyle2);
    } else if (descuento == 20) {
      setImageStyle(newStyle3); 
    } else if (descuento == 10) {
      setImageStyle(newStyle4);
    }

  }, [descuento]);

  const descuentos = (num) => {
    setDescuento(num);
  }

  useEffect(() => {
    if (user != null) {
      const helper = user.uid.slice(0, 10);
      setUid(user.uid);
    } else {
      setUid("guest");
    }
  }, [])

  useEffect(() => {
    console.log('El id es ++++', uid);
    setQRInfo(uid+"-"+productos.id+"-"+descuento.toString())
    console.log(descuento)
    }, [uid, descuento])

  const hideElements = (rBool) => {
    setHide(rBool);
    console.log(rBool);
  };

  // Actualizar la pantalla
  const onUpdateScreen = (err, result) => {
    if (result) {
      findCode(result.text);
      setShow(false);
      hideElements(false);
    }
  };
  
  // Buscar código
  const findCode =  (code) => { 
    if (productos[0].codigo == code) {
      // Código encontrado
      setCompletado(true);
      setOpen(true);

    }
  }

  // Data FETCH
  useEffect(() => {
    fetchRandom();
  }, []);
  
  // Data Randomization
  const fetchRandom = async () => {
    try {
      const coll = collection(database, 'Productos');
      const snapshot = await getCountFromServer(coll);
      let randomInteger = Math.floor(Math.random() * 31) + 1;
      console.log(randomInteger);
      await fetchProd(randomInteger);
      await fetchPist(randomInteger);
    } catch (error) {
      console.log(error);
    }
  };

  // Product Fetch
  const fetchProd = async (number) => {
    try {
      const coll = collection(database, 'Productos');
      const q = query(coll, where(documentId(), '==', String(number)));
      const data1 = onSnapshot(q, querySnapshot => {
        setProductos(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            imag: doc.data().imagen, 
            nombre: doc.data().producto, 
            codigo: doc.data().upc
          }))
        );
      });
      setCargarProd(true);
      console.log('EL PRODUCTO 29', productos);
      return data1;
    } catch (error) {
      console.log(error);
    }
  };

  // Pistas FETCH
  const fetchPist = async (number) => {
    try {
      const coll = collection(database, 'WTP');
      const q = query(coll, where(documentId(), '==', String(number)));
      const data2 = onSnapshot(q, querySnapshot => {
        setPistas(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            pistas: doc.data().pistas
          }))
        );
      });
      setCargarPist(true);
      return data2;
    } catch (error) {
      console.log(error);
    }
  };
  
  if (cargarPist && cargarProd) {
    if (productos.length > 0 && pistas.length > 0) {
      return (
        <>
          {console.log('ProductosSSS222', productos[0].imag)}
             

            <Modal open={open} onClose={handleClose}>

              <Box sx={style}>
                <div style={{alignItems : "center", marginTop : "20px"}} >
                <QRCode value={QRInfo} size={160} bgColor="#282c34" fgColor="#fff" level="H" /> 
                <Typography variant='h4' sx={{ fontWeight: 'bold', mt: 3}}><span>¡Felicidades!</span> Canjea tu descuento en caja</Typography></div>
              </Box>

            </Modal> 

          <>
          
            {
            show ? 
            
            <div className="App">

            <Container sx={{ mb: 10 }}>
              <JuegoAppBar />
            </Container>

              <>
                {show && (
                  <BarcodeScannerComponent onUpdate={(err, result) => onUpdateScreen(err, result)}/>
                )}
              </>

              <Button  variant="contained" onClick = {() => { 
                setShow(!show);
                hideElements(false);
                setShowtf(false);
                
                } } sx={{bgcolor: "#F3231F", display: 'Block', m: 'auto', mt: '25px'}}>
                  Cerrar
              </Button>

              <Button sx={{position: 'fixed',bottom: 80, left: 0, ml: 'auto', mr: 'auto', textTransform: 'none', maxWidth: '300px'}} onClick = {() => { 
                if (showtf) {
                  setShowtf(false);
                   // ya no es necesario
                } else {
                  setShowtf(true);
                  
                }
                }} >
                  <Typography>Escanea el producto deseado.<br/> <u>Ingresar manualmente</u></Typography>
              </Button>

              <Modal open={showtf} onClose={handleClosetf}>
                <Box sx={style}>
                <Typography variant='h6'>Código del producto</Typography>
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
                      Ingresar Código
                  </Button>
                </Box>
              </Modal>

            </div> : 

            <div className="bod">

            <Container sx={{ mb: 10 }}>
              <JuegoAppBar />
            </Container>

            <Container maxWidth="sm">
              <Box sx={{ mt: 20, backgroundColor: "transparent", alignContent: "center", p:5, mb: 13 }}>
                <Card sx={{ maxWidth: 360, height: 210, backgroundColor: 'transparent'  , position: 'relative', boxShadow: 0}}>
                  
                  <img src={productos[0].imag} alt="Imagen" className="imagenProducto"/>
                  <img src={productos[0].imag} style={imageStyle} alt="Imagen Negra"/>
                </Card>
              </Box>
            
            </Container>|
            <Box sx={{zIndex: 4, position: "relative", borderTop: '2'}}>
            <Pistas props={pistas} descuentos={descuentos}/>
            </Box>
            
            <div style={{ display: 'flex', flexDirection: 'flex-column', width: '100%', flexWrap: 'wrap', overflowY: "visible", alignItems: "center", justifyContent: "center", position: 'relative' }}>
              
              <Button variant="contained" onClick={() => {setShow(true); hideElements(true);}} sx={{bgcolor: "#F3231F", mb: 2}}>Escanear código</Button>
              <Divider sx={{width:"90%", mb:2}}/>
                    
            </div> 

            </div>
          }
          </>
          
        </>
      );
    }
  }
  
  return (
    <>
      <Container sx={{ mb: 10 }}>
        <JuegoAppBar />
      </Container>
      <Container sx={{ mt: 50, alignItems: "center" }}>
        <CircularProgress/>
      </Container>
    </>
  );
}

export default WTPJuego