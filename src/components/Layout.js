import React from 'react'
import { DivGrid } from '../styles'

import Header from './layout/Header'
import Footer from './layout/Footer'

export default function Layout(props) {
  return (
    <DivGrid>
      <Header />
      {props.children}
      <Footer />
    </DivGrid>
  )
}
