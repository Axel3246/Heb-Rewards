//import LikedButton from "../components/LikedButton"
import React, { useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { images } from '../../constants'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion } from 'firebase/firestore';
import ProductoPag from './ProductoPag';
import './productos.css'
import Footer from '../../pages/Home/components/Footer'



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '32px',
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.85),
    },
    marginRight: theme.spacing(3),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'action',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));



const Productos = () => {

    const [nombre, onChange] = useState('')
    const [productos, setProductos] = useState([])
    const [departamento, setDepartamento] = useState('')
    const [hayOferta, setHayOferta] = useState('')

    var value = '';
    var q;

    const ShowSelected = (event) => {
        /* Para obtener el valor */
        const selectedValue = event.target.value;
        const valuesArray = ['', 'Alimentos Preparados', 'Bebés', 'Botanas', 'Carnes y Aves', 'Cervezas', 'Despensa', 'Desechables', 'Deportes', 'Farmacia', 'Frutas y Verduras'];
       
        var cod = valuesArray[selectedValue];
        console.log(cod);
        setDepartamento(cod);
        /* Para obtener el texto
        var combo = document.getElementById("producto");
        var Selected = combo.MenuItems[combo.SelectedIndex].text;
        console.log(Selected);*/
    }

    const ShowSelected2 = (event) => {
        /* Para obtener el valor */
        const selectedValue = event.target.value;
        const valuesOffer = ['', 'R'];

        var cod2 = valuesOffer[selectedValue];
        console.log(cod2);
        setHayOferta(cod2);

    }


    useEffect(() => {

        const collectionRef = collection(database, 'Productos');

        if (departamento == '' && hayOferta == '') {
            q = query(collectionRef, where("sucursal", '==', "ESL"), orderBy('producto'), startAt(nombre), endAt(nombre + '\uf8ff'))
        }
        else if (departamento != '' && hayOferta == '') {
            q = query(collectionRef, where("sucursal", '==', "ESL"), where("departamento", '==', departamento), orderBy('producto'), startAt(nombre), endAt(nombre + '\uf8ff'))
        }
        else if (departamento == '' && hayOferta != '') {
            q = query(collectionRef, where("sucursal", '==', "ESL"), where("tipo", 'in', ['M', 'R']), orderBy('producto'), startAt(nombre), endAt(nombre + '\uf8ff'))
        }
        else if (departamento != '' && hayOferta != '') {
            q = query(collectionRef, where("sucursal", '==', "ESL"), where("tipo", 'in', ['M', 'R']), where("departamento", '==', departamento), orderBy('producto'), startAt(nombre), endAt(nombre + '\uf8ff'))
        }

        //const q = query(collectionRef,  where("sucursal", '==', "ESL"));

        const unsuscribe = onSnapshot(q, querySnapshot => {
            setProductos(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    capacidad: doc.data().capacidad,
                    departamento: doc.data().departamento,
                    fecha: doc.data().fecha,
                    imagen: doc.data().imagen,
                    id2: doc.data().id,
                    marca: doc.data().marca,
                    multiplo: doc.data().multiplo,
                    oferta: doc.data().oferta,
                    pasillo: doc.data().pasillo,
                    precio: doc.data().precio,
                    producto: doc.data().producto,
                    sucursal: doc.data().sucursal,
                    tipo: doc.data().tipo,
                    unidad: doc.data().unidad,
                    upc: doc.data().upc,
                })
                )

            )
        })
        console.log("Vuelve a repetir")
        return unsuscribe;

    }, [nombre, departamento, hayOferta])

    return (
        <>
            <Container sx={{ alignItems: 'center' }}>
                <AppBar position="fixed" sx={{ bgcolor: '#FE231F' }}>
                    <Toolbar disableGutters>
                        <Box sx={{ display: 'flex', p: 1, flexGrow: 1 }}>
                            <IconButton size="large" color="inherit" href='/'>
                                <HomeIcon />
                            </IconButton>
                            <IconButton sx={{ ml: 'auto', mr: 'auto' }} href='/'>
                                <Box component="img" src={images.heb_svg} sx={{ maxHeight: 120, height: 1, width: 1 }} />
                            </IconButton>
                            <IconButton size="large" color="inherit" href='/lista'>
                                <ShoppingCartOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                    <Box sx={{ px: 2, py: 1 }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon color="action" />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Buscar en heb.com.mx"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => { onChange(e.target.value) }}
                            />
                        </Search>
                    </Box>
                </AppBar>

                <div className="grid-container" style={{ display: 'flex' }}>
                <Divider></Divider>
                <Typography variant='h4' sx={{ fontWeight: 'bold', mt: 4, mb: 5 }}><span>Filtra</span> tu busqueda</Typography>

                    <div className="item-1" style={{ marginTop: '-2rem', marginBottom: '5rem', minWidth: '21%' }}>
                        <Select id="producto" name="producto" placeholder="Age" onChange={ShowSelected} sx={{mb: 1}}>
                            <MenuItem value={0}>Todo...</MenuItem>
                            <MenuItem value={1}>Alimentos Preparados</MenuItem>
                            <MenuItem value={2}>Bebés</MenuItem>
                            <MenuItem value={3}>Botanas</MenuItem>
                            <MenuItem value={4}>Carnes y Aves</MenuItem>
                            <MenuItem value={5}>Cervezas</MenuItem>
                            <MenuItem value={6}>Despensa</MenuItem>
                            <MenuItem value={7}>Desechables</MenuItem>
                            <MenuItem value={8}>Deportes</MenuItem>
                            <MenuItem value={9}>Farmacia</MenuItem>
                            <MenuItem value={10}>Frutas y Verduras</MenuItem>
                        </Select>
                        <br />
                        <Select id="ofertas" name="ofertas" onChange={ShowSelected2}>
                            <MenuItem value={0}>Todo...</MenuItem>
                            <MenuItem value={1}>Todas las Ofertas</MenuItem>
                        </Select>
                    </div>
                    <Divider></Divider>
                    <div className="item-2">
                        <ProductoPag products={productos} />
                    </div>
                </div>
            </Container>
            <Footer/>
        </>
    )
}

export default Productos