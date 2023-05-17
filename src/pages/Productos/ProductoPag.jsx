import React, { useState, useEffect } from 'react'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';
import ReactPaginate from 'react-paginate';
import RecargaProductos from './RecargaProductos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './productos.css'
import { Translate } from '@mui/icons-material';
import { Container, Box } from '@mui/material';

const ProductoPag = ({ products }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 10;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


    const [nombre, onChange] = useState('')
    const [productos, setProductos] = useState([])
    
  return (
    <>
    <Container sx={{ display: 'flex',  justifyContent: 'center'}}>
      <RecargaProductos
        productos={products.slice(pagesVisited, pagesVisited + productsPerPage)}
      />    
    </Container>

    <Box sx={{alignItems: 'center'}}>
        <ReactPaginate
        breakLabel="..."
        previousLabel={<ArrowBackIcon/>}
        nextLabel={<ArrowForwardIcon/>}
        pageCount={pageCount}
        onPageChange={changePage}
        pageRangeDisplayed={3}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num-back"
        nextLinkClassName="page-num-for"
        activeLinkClassName="active"
    />
        </Box>  
    </>
  );
};

export default ProductoPag;