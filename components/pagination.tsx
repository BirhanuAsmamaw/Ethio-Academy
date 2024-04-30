"use client"
import React from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';


interface PaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
  }
const PaginationComponent:React.FC<PaginationProps> = ({ currentPage, totalPages, hasNextPage, hasPreviousPage, onPageChange }) => {
  const handlePrevClick = () => {
    if (hasPreviousPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page:any) => {
    onPageChange(page);
  };

  // Calculate the list of three pages after the current page
  const pagesAfterCurrent = [];
 if(totalPages>3){
  for (let i = currentPage ; i <= Math.min(currentPage + 3, totalPages); i++) {
    pagesAfterCurrent.push(i);
  }
 }
 else{
  for (let i = 1 ; i <= totalPages; i++) {
    pagesAfterCurrent.push(i);
  }
 }

  return (

<Pagination >
      <PaginationContent>
        <PaginationItem className=' list-none underline-none' onClick={handlePrevClick} >
          <PaginationPrevious 
           className={` no-underline ${hasPreviousPage? 'text-gray-blue-400 dark:text-green-400':'text-gray-500 dark:text-gray-400 '}`}
           />
        </PaginationItem>
       

        {pagesAfterCurrent.map(page => (
           <PaginationItem className=' list-none underline-none'  key={page} onClick={() => handlePageClick(page)}>
           <PaginationLink    className={` rounded-full border-2 no-underline ${currentPage===page? 'text-gray-blue-400 dark:text-green-400 border-blue-400 dark:border-green-400':' border-gray-400 dark:border-gray-600 text-gray-500 dark:text-gray-400'}`}  isActive={currentPage===page}>
           {page}
           </PaginationLink>
         </PaginationItem>
        
        ))}
       
        
        <PaginationItem className='hidden md:block list-none underline-none'>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem className=' list-none underline-none' onClick={handleNextClick}>
          <PaginationNext   className={` no-underline ${hasNextPage? 'text-gray-blue-400 dark:text-green-400':'text-gray-500 dark:text-gray-400'}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>

  
  );
};

export default PaginationComponent;
