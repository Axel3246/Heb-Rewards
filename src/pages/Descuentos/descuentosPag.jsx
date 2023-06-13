import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import DescuentosRecarga from './descuentosRecarga';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Container, Box } from '@mui/material';

import './descuentos.css';

const DescuentosPag = ({ descuentos, uid }) => {
    const [pageNumber, setPageNumber] = useState(0);
    const descuentosPerPage = 10;
     const pagesVisited = pageNumber * descuentosPerPage;
    const pageCount = Math.ceil(descuentos.length / descuentosPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <>
            <Container sx={{ display: 'flex',  justifyContent: 'center', p: 0}}>
                <DescuentosRecarga descuentos={descuentos} uid={uid}/>    
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
    )
};

export default DescuentosPag;