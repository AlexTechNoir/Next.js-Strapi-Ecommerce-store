import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function Nav({ toggleNav, isNavVisible }) {
  const [ navItems, setNavItems ] = useState([])

  useEffect(async () => {
    const data = await fetch(`/api/categories`)
      .then(res => res.json())
      .catch(err => console.error(err.message))

    const navItems = data.data.categories.data

    setNavItems(navItems)
  },[])

  return (
    <StyledNav isNavVisible={isNavVisible}>
      <ul className="nav">
        {
          navItems.map(navItem => (
            <li className="nav-item" onClick={toggleNav} key={navItem.id}>
              <Link 
                href={
                  `/products/${encodeURIComponent(navItem.attributes.name.toLowerCase().trim().replace(' ', '-'))}/1`
                } 
              >
                <a className="nav-link"><b>{navItem.attributes.name}</b></a>
              </Link>
            </li>
          ))
        }
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
  visibility: ${props => props.isNavVisible ? 'visible' : 'hidden'};
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
