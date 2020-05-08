import React from 'react'
import { GlobalStyle, DivGrid } from '../styles'

import Header from './layout/Header'
import Footer from './layout/Footer'

export default function Layout(props) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <DivGrid>
        <Header />
        {props.children}
        <Footer />
      </DivGrid>
    </React.Fragment>
  )
}
