import React, { useState, useEffect } from 'react'
import { database, auth, signInWithGoogle } from '../../FirebaseConfig'
import { collection, doc, where, setDoc, getDocs, addDoc, startAt, endAt, limit, documentId, onSnapshot, QuerySnapshot, orderBy, query, arrayUnion} from 'firebase/firestore';
import ReactPaginate from 'react-paginate';
import RecargaProductos from './RecargaProductos';
import './productos.css'
import { Translate } from '@mui/icons-material';

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
    <div style={{ display: 'flex', position: 'relative', justifyContent: 'center'}}>
      <RecargaProductos
        productos={products.slice(pagesVisited, pagesVisited + productsPerPage)}
      />    
    </div>

    <div style={{position: 'relative', marginLeft: '300px'}}>
        <ReactPaginate
        breakLabel="..."
        previousLabel={'<atr'}
        nextLabel={'sig>'}
        pageCount={pageCount}
        onPageChange={changePage}
        pageRangeDisplayed={3}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
    />
        </div>  
   
    
    </>
  );
};

export default ProductoPag;