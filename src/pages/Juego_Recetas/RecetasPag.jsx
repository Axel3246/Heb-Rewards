import React, { useState, useEffect } from 'react'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';
import ReactPaginate from 'react-paginate';
import RecargaRecetas from './RecargaRecetas';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './recetas.css'
import { Translate } from '@mui/icons-material';
import { Container, Box } from '@mui/material';

const RecetasPag = ({ recipes }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const recipesPerPage = 10;
  const pagesVisited = pageNumber * recipesPerPage;
  const pageCount = Math.ceil(recipes.length / recipesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  const [nombre, onChange] = useState('')
  const [recetas, setRecetas] = useState([])
    
  return (
    <>
    <Container sx={{ display: 'flex',  justifyContent: 'center', p: 0}}>
      <RecargaRecetas
        recetas={recipes.slice(pagesVisited, pagesVisited + recipesPerPage)}
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

export default RecetasPag;