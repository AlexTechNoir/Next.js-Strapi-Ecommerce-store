import React from 'react'
import Head from 'next/head'
import { GlobalStyle, DivGrid } from '../styles'

import Header from './layout/Header'
import Footer from './layout/Footer'

export default function Layout(props) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Head>
        <link rel="icon" href="/favicon.ico" />

        {/* Bootstrap */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>

        {/* Google Font */}
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap" rel="stylesheet"></link>

        {/* React Responsive Carousel */}
        <link rel="stylesheet" href="carousel.css" />
      </Head>

      <DivGrid>
        <Header />
        {props.children}
        <Footer />
      </DivGrid>
    </React.Fragment>
  )
}
