import React from 'react'
import { StyledHeader } from '../../styles'

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
