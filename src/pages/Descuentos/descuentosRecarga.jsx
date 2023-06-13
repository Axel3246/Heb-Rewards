import React from 'react';
import { CardMedia, Divider, Paper, Typography, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './descuentos.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';
import { database } from '../../FirebaseConfig'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import QRCode from 'react-qr-code';

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

var des;

const DescuentosRecarga = ({ descuentos, uid }) => {
    const history = useNavigate();

    const [ help, setHelp ] = useState([]);
    const [ arrayHelp, setArrayHelp ] = useState([]);
    const [index, setIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [qrinfo, setQrinfo] = useState();
    const handleQrinfo = (id_producto, descuento) => setQrinfo(uid+"-"+id_producto+"-"+descuento);

    function firebaseGet(){
        
    }

    useEffect(() => {
        console.log("descuentos 2da pag")
        console.log(descuentos)
        if (descuentos.length == 0) {
            setIndex(-1);
        } else {
            setIndex(0);
        }
        
        console.log("index")
        console.log(index)
        setArrayHelp([])
    }, [descuentos])

    useEffect(() => {
        console.log("useeffect")
        console.log(descuentos)
        if (descuentos != [] && index != -1) {
            console.log("descuentos not null")
            if (index < descuentos.length) {
                console.log("im in")
                console.log(index)
                console.log("ident")
                console.log(descuentos[index])
                if (descuentos[index].juego == 1) {
                    const coll = collection(database, 'Recetas');
                    const q = query(coll, where(documentId(), '==', descuentos[index].idObjeto.toString()));
                    
                    const unsuscribe = onSnapshot(q, querySnapshot => {
                    console.log("Sopas")
                    des = (querySnapshot.docs.map(doc => ({
                        id: descuentos[index].descuentoID,
                        url_imagen: doc.data().imagen, 
                        nombre: doc.data().nombre,
                        juego: descuentos[index].juego,
                        descuento: descuentos[index].descuento,
                        id_producto: descuentos[index].idObjeto
                    }) 
                        )   
                    )
                    console.log(des)
                    setArrayHelp(arrayHelp => [...arrayHelp,des[0]] );
                    setIndex(index+1)
                    //console.log(arrayHelp)
                    console.log("Sopas2")})
                    return unsuscribe;

                } else if (descuentos[index].juego == 2) {
                    const coll = collection(database, 'Productos');
                    const q = query(coll, where(documentId(), '==', descuentos[index].idObjeto.toString()));
                    const unsuscribe = onSnapshot(q, querySnapshot => {
                    console.log("Sopas")
                    des = (querySnapshot.docs.map(doc => ({
                        id: descuentos[index].descuentoID,
                        url_imagen: doc.data().imagen, 
                        nombre: doc.data().producto,
                        juego: descuentos[index].juego,
                        descuento: descuentos[index].descuento,
                        id_producto: descuentos[index].idObjeto
                        }) 
                        )   
                    )
                    console.log(des)
                    //arrayHelp.push(des[0])
                    setArrayHelp(arrayHelp => [...arrayHelp,des[0]] );
                    setIndex(index+1)
                    console.log(arrayHelp)
                    console.log("Sopas2")})
                    return unsuscribe;
                }
                

            }
        }
    }, [index])
/*
    useEffect(() => {
        if (descuentos != []) {
            setArrayHelp([]);
            console.log("descuentos xd");
        console.log(descuentos);
        descuentos.forEach(element => {
            
        });
        }
        
          
        //const q = query(collectionRef,  where("sucursal", '==', "ESL"));
  
    }, [descuentos])*/

    useEffect(() => {
        console.log("new array help")
        console.log(arrayHelp)

    }, [arrayHelp])

    useEffect(() => {
        console.log("new index")
        console.log(index)

    }, [index])

    return (
        <div className="ContenedorCartas" style={{ display: 'flex', marginTop: '20px', flexDirection: 'flex-column', width: '100%', flexWrap: 'wrap', overflowY: "visible", position: 'relative' }}>

        {

            descuentos[0] != null ? <>
            {arrayHelp.map((item) => ( <>
                <button  key={item.id} style={{backgroundColor: 'white', padding: '0px', margin: "0px 7.5px 15px 7.5px", borderWidth: "0px", display:'flex', alignItems:'center'}} onClick={() => {setOpen(true); handleQrinfo(item.id_producto, item.descuento)}}>
                    <Paper sx={{ml:'auto', mr:'auto'}}elevation={1} className='paper_container'>

                        <Typography variant="subtitle2" sx={{ fontWeight: '1', fontSize: 16, mb: 2, mt: 2 }}>
                            {
                                item.juego == 1 ? <>Dine n' <span>Dash</span></> : <><span>What's</span> that Product?</>
                            }
                        </Typography>

                        <CardMedia
                                        component="img"
                                        sx={{ height: 120, width: 120, alignItems: 'center', textAlign: 'center', marginLeft: 'auto', mr: 'auto' }}
                                        image={item.url_imagen}
                                        object-fit="fill"
                                    />

                        <Divider sx={{width:85, mb:2, mt: 2, ml: 'auto', mr: 'auto', backgroundColor:'#FE231F'}}></Divider>

                        <div style={{width: '89%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <Typography gutterBottom variant="h6" component="div" sx={{fontWeight: 'bold', fontSize: 16}}>
                                {item.nombre}
                            </Typography>
                        </div>
                    
                    </Paper>
                
                </button>

                <Modal open={open} onClose={handleClose}>
                        
                    <Box sx={style}>
                        <div style={{alignItems : "center", marginTop : "20px"}} >
                        <QRCode value={qrinfo} size={160} bgColor="#282c34" fgColor="#fff" level="H" /> 
                        <Typography variant='h4' sx={{ fontWeight: 'bold', mt: 3}}><span>¡Felicidades!</span> Canjea tu descuento en caja</Typography></div>
                    </Box>

                </Modal>

                </>

            ))}
            </> : 
            <>
                <Alert variant="filled" severity="error" style={{marginTop: 200, marginBottom: 200}}>
                    ¡Lo sentimos! Juega y participa para obetener descuentos!.
                </Alert>
            </>
        }


        </div>
    )
}

export default DescuentosRecarga;