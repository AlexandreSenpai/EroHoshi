import React from 'react';

import ReactPaginate from 'react-paginate';

import {
    PaginationHolder
} from './styles';

export default function Pagination({ setCurrentPage, totalPages, currentPage }) {

    return(
        <PaginationHolder>
            <ReactPaginate 
                pageCount={totalPages || 1} 
                marginPagesDisplayed={2} 
                onPageChange={setCurrentPage}
                containerClassName="paginationContainer" 
                pageClassName="page" 
                activeClassName="active" 
                forcePage={currentPage}
                />
        </PaginationHolder>
    )
}