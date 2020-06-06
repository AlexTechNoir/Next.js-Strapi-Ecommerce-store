import React from 'react'
import { StyledFooter } from '../../styles'

import Lists from './footer/Lists'
import Buttons from './footer/Buttons'
import Social from './footer/Social'

export default function Footer() {
  return (
    <StyledFooter>
      <Lists />
      <Buttons />
      <Social />
    </StyledFooter>
  )
}
