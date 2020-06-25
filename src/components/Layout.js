import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Header from './layout/Header'
import AuthForm from './layout/AuthForm'
import Footer from './layout/Footer'

export default function Layout(props) {
  const [ isAuthModalVisible, setIsAuthModalVisible ] = useState(false)
  const [ isLogInTabVisible, setIsLogInTabVisible ] = useState(null)

  const handleVisibility = e => {
    if (e.currentTarget.name === 'logIn') {
      setIsAuthModalVisible(true)
      setIsLogInTabVisible(true)
      document.body.style.overflow = 'hidden'
    } else if (e.currentTarget.name === 'singUp') {
      setIsAuthModalVisible(true)
      setIsLogInTabVisible(false)
      document.body.style.overflow = 'hidden'
    }
  }

  const closeAuthModal = e => {
    if (e.target.id === 'outsideAuthModal') {
      setIsAuthModalVisible(false)
      document.body.style.overflow = 'visible'
    }
  }

  return (
    <>
      <GlobalStyle />
      <DivGrid>
        <Header handleVisibility={handleVisibility} />
        {
          isAuthModalVisible
          ? <AuthForm 
              isLogInTabVisible={isLogInTabVisible}
              closeAuthModal={closeAuthModal}
              handleVisibility={handleVisibility} 
            />
          : null
        }
        {props.children}
        <Footer />
      </DivGrid>
    </>
  )
}

const GlobalStyle = createGlobalStyle` 
  * {
    box-sizing: border-box;
    &:not([data-offset-key]):not([data-text]) {
      font-family: 'Roboto Condensed', sans-serif;
    }
  }

  html, body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Georgia, sans-serif;
    height: 100%;
    scroll-behavior: smooth;
    background-color: #e9e9e9; 
  }

  #__next {
    height: 100%;
  }

  @font-face {
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/roboto-condensed-v18-latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Roboto Condensed'), local('RobotoCondensed-Regular'),
      url('/fonts/roboto-condensed-v18-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('/fonts/roboto-condensed-v18-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
      url('/fonts/roboto-condensed-v18-latin-regular.woff') format('woff'), /* Modern Browsers */
      url('/fonts/roboto-condensed-v18-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
      url('/fonts/roboto-condensed-v18-latin-regular.svg#RobotoCondensed') format('svg'); /* Legacy iOS */
  }
`

const DivGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 100% auto;
  height: 100%;
  position: relative;

  @media only screen and (min-width: 1220px) {
    grid-template-columns: 1fr 1200px 1fr;
  }
`
