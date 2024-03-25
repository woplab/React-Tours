// app/tours/Pagination.tsx
import React from 'react';

interface PaginationProps {
    toursPerPage: number;
    totalTours: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ toursPerPage, totalTours, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalTours / toursPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4">
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className={currentPage === number ? 'active' : ''}>
                        <button onClick={() => paginate(number)} className="btn-pagination">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
