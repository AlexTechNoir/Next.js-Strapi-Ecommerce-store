import Link from 'next/link'
import styled from 'styled-components'

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

const StyledNav = styled.nav`
  min-width: 255px;
  max-width: 255px;
  position: absolute;
  top: 104px;
  left: -60px;
  z-index: 3;
  > ul {
    display: flex;
    flex-direction: column;
    background: #f8f9fa;
    > li {
      border-left: 2px solid red;
      border-bottom: 1px solid #acacac;
      border-right: 1px solid #acacac;
      font-size: 0.8125rem;
    }
  }

  @media only screen and (min-width: 600px) {
    left: -200px;
  }

  @media only screen and (min-width: 686px) {
    top: 49px;
  }

  @media only screen and (min-width: 1024px) {
    left: -165px;
  }  
`
