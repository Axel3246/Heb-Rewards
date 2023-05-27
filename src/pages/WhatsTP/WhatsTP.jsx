import React, { useEffect, useState } from "react";
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, getCountFromServer, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CircularProgress } from '@mui/material';
import { useLocation } from "react-router-dom";
import WTPAppBar from "../WhatsTP/components/WTPAppBar";
import { Container, Box, Card, CardMedia } from "@mui/material";
import { images } from "../../constants";
import "./Styles.css";

const WhatsTP = () => {

  // Hooks declarations
  const location = useLocation();
  const user = auth.currentUser;
  const [cargarProd, setCargarProd] = useState(false);
  const [cargarPist, setCargarPist] = useState(false);
  const [done, setDone] = useState(false);
  const [productos, setProductos] = useState([]);
  const [pistas, setPistas] = useState([]);

  // Data FETCH
  useEffect(() => {
    fetchRandom();
  }, []);

  // Data Randomization
  const fetchRandom = async () => {
    try {
      const coll = collection(database, 'Productos');
      const snapshot = await getCountFromServer(coll);
      let randomInteger = 29;
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

  console.log("Las pistas son", ...pistas)

  // Fetched Validation
  if (cargarPist && cargarProd) {
    if (productos.length > 0 && pistas.length > 0) {
      return (
        <>
          {console.log('ProductosSSS222', productos[0].imag)}
          <div className="bod">
            <Container sx={{ mb: 10 }}>
              <WTPAppBar />
            </Container>
            <Container maxWidth="sm">
              <h1>{productos[0].nombre}</h1>
              <Box sx={{ mt: 8, backgroundColor: "white", alignContent: "center", p:5 }}>
                <Card sx={{ maxWidth: 345, backgroundColor: 'red' }}>
                  <CardMedia
                    sx={{ height: 180, p: 2, mt: 2 }}
                    image={productos[0].imag}
                  />
                </Card>
              </Box>
            </Container>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Container sx={{ mb: 10 }}>
        <WTPAppBar />
      </Container>
      <Container sx={{ mt: 50, alignItems: "center" }}>
        <CircularProgress/>
      </Container>
    </>
  );
};

export default WhatsTP;
