"use client"
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
  }
const Pagination:React.FC<PaginationProps> = ({ currentPage, totalPages, hasNextPage, hasPreviousPage, onPageChange }) => {
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
  for (let i = currentPage + 1; i <= Math.min(currentPage + 3, totalPages); i++) {
    pagesAfterCurrent.push(i);
  }

  return (
    <div>
      <button onClick={handlePrevClick} disabled={!hasPreviousPage}>Previous</button>
      <span>{currentPage} of {totalPages}</span>
      <button onClick={handleNextClick} disabled={!hasNextPage}>Next</button>

      {/* Render the list of three pages after the current page */}
      <div>
        {pagesAfterCurrent.map(page => (
          <button key={page} onClick={() => handlePageClick(page)}>{page}</button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
