import React from 'react'
import styled from 'styled-components'

import Logo from './header/Logo'
import Catalogue from './header/Catalogue'
import Search from './header/Search'
import CartButton from './header/CartButton'
import AuthButtons from './header/AuthButtons'

export default function Header({ handleVisibility }) {
  return (
    <StyledHeader>
      <Logo />
      <Catalogue />
      <Search />
      <div>
        <CartButton />
        <AuthButtons handleVisibility={handleVisibility} />
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  grid-area: 1 / 1 / 2 / 4;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto 1fr auto;
  background: #f8f9fa;
  margin-bottom: 2em;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  > :first-child {
    cursor: pointer;
  }
  > :nth-child(2) {
    align-self: center;
    position: relative;
    > button {
      border: 1px solid lightgrey;
      color: #007bff;
      font-weight: bold;
    }
  }
  > :nth-child(3) {
    grid-area: 2 / 1 / 3 / 5;
    align-self: center;
    justify-self: stretch;
    margin: 1em;
    display: flex;
    > input {
      border: 1px solid black;
      border-right: 0;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      padding: 0 .3em 0 .3em;
      width: 100%;
    }
    > button {
      height: auto;
      width: auto;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border: 1px solid #ffc107;
      background: #ffc107;
      color: #dc3545;
      cursor: pointer;
    }
  }
  > :last-child {
    grid-area: 1 / 4 / 2 / 5;
    display: flex;
    margin-right: 1em;
    > * {
      color: #007bff;
      align-self: center;
      cursor: pointer;      
      margin: 0 .2em 0 .2em;
    }
    > button {
      display: flex;
      padding: 0;
      font-size: .8em; 
    }
  }

  @media only screen and (min-width: 686px) {
    grid-template-rows: auto;
    > :nth-child(3) {
      grid-area: 1 / 3 / 2 / 4;
    }
  }
`
