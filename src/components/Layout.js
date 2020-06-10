import React, { useState } from 'react'
import { GlobalStyle, DivGrid } from '../styles'

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
    <React.Fragment>
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
    </React.Fragment>
  )
}
