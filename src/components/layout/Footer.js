import React from 'react'
import { StyledFooter } from '../../styles'

import Lists from './footer/Lists'
import I18nButtons from './footer/I18nButtons'
import Social from './footer/Social'

export default function Footer() {
  return (
    <StyledFooter>
      <Lists />
      <I18nButtons />
      <Social />
    </StyledFooter>
  )
}
