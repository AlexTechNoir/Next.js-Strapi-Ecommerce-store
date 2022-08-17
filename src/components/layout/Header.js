import styled from 'styled-components'

import Logo from './header/Logo'
import Catalogue from './header/Catalogue'
import Search from './header/Search'
import CartButton from './header/CartButton'
import AuthButtons from './header/AuthButtons'

export default function Header({ handleAuthModalVisibility }) {
  return (
    <StyledHeader >
      <Logo />
      <Catalogue />
      <Search />
      <div className="buttons">
        <CartButton />
        <AuthButtons handleAuthModalVisibility={handleAuthModalVisibility} />
      </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  grid-area: 1 / 1 / 2 / 4;
  display: grid;
  grid-template-rows: auto;  
  grid-template-columns: auto auto 1fr auto;
  background: #f8f9fa;
  margin-bottom: 2em;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  > .logo {
    cursor: pointer;
  }
  > .buttons {
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

  @media only screen and (max-width: 686px) {
    grid-template-rows: auto auto;
  }
`
