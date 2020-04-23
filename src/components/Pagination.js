import React from 'react'
import Link from 'next/link'

export default function Pagination({ currentPage, pageNumbers, paginate, goToPrevOrNextPage }) {
  return (
    <nav>
      <ul className="pagination mt-3">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Link href="/mobile_phones" 
                className="page-link" 
                aria-label="Previous" 
                id="Previous"
                onClick={e => goToPrevOrNextPage(e, currentPage)}>
            <a>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </Link>
        </li>
        {
          pageNumbers.map(number => (
            <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
              <Link to="/mobile_phones" className="page-link" onClick={e => paginate(e, number)}>
                {number}
              </Link>
            </li>
          ))
        }
        <li className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""}`}>
          <Link href="/mobile_phones" 
                className="page-link" 
                aria-label="Next"
                id="Next"
                onClick={e => goToPrevOrNextPage(e, currentPage)}>
            <a>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
