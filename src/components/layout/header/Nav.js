import React from 'react'
import Link from 'next/link'
import { StyledNav } from '../../../styles'

export default function Nav() {
  return (
    <StyledNav>
      <ul className="nav">
        <li className="nav-item">
          <Link href="/products/mobile-phones/[page]" as="/products/mobile-phones/1">
            <a className="nav-link"><b>Mobile Phones</b></a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/products/laptops/[page]" as="/products/laptops/1">
            <a className="nav-link"><b>Laptops</b></a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/products/tablets/[page]" as="/products/tablets/1">
            <a className="nav-link"><b>Tablets</b></a>
          </Link>
        </li>
        <li className="nav-item">
          <a href="/#" className="nav-link">
            <b>Lorem ipsum sin amet</b> 
          </a>
        </li>
        <li className="nav-item">
          <a href="/#" className="nav-link">
            <b>Lorem ipsum sin amet</b> 
          </a>
        </li>
        <li className="nav-item">
          <a href="/#" className="nav-link">
            <b>Lorem ipsum sin amet</b> 
          </a>
        </li>
        <li className="nav-item">
          <a href="/#" className="nav-link">
            <b>Lorem ipsum sin amet</b> 
          </a>
        </li>
        <li className="nav-item">
          <a href="/#" className="nav-link">
            <b>Lorem ipsum sin amet</b> 
          </a>
        </li>
        <li className="nav-item">
          <a href="/#" className="nav-link">
            <b>Lorem ipsum sin amet</b> 
          </a>
        </li>
        <li className="nav-item">
          <a href="/#" className="nav-link">
            <b>Lorem ipsum sin amet</b> 
          </a>
        </li>
      </ul>
    </StyledNav>
  )
}
