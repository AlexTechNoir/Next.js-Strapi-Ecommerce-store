import { useState } from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

import LogIn from './authForm/LogIn'
import Registration from './authForm/Registration'
const ResetPassword = dynamic(() => import('./authForm/ResetPassword'))

export default function AuthForm({ isLogInTabVisible, closeAuthModal, handleAuthModalVisibility }) {
  const [ isResetPasswordVisible, setIsResetPasswordVisible ] = useState(false)

  const showResetPassword = e => {
    e.preventDefault()
    setIsResetPasswordVisible(true)
  }

  const hideResetPassword = () => setIsResetPasswordVisible(false)

  return (
    <DivAuthWrapper id="outsideAuthModal" onClick={e => closeAuthModal(e)}>
      <div id="authModal">
        {
          !isResetPasswordVisible
          ? <DivAuthButtons>
              <button 
                type="button" 
                name="logIn" 
                className={`btn ${isLogInTabVisible ? "btn-light" : "btn-secondary"} border-left border-top border-right shadow-none`} 
                onClick={e => handleAuthModalVisibility(e)}
              >
                Sing In
              </button>
              <button 
                type="button" 
                name="singUp" 
                className={`btn ${isLogInTabVisible ? "btn-secondary" : "btn-light"} border-left border-top border-right shadow-none`} 
                onClick={e => handleAuthModalVisibility(e)}
              >
                Registration
              </button>
            </DivAuthButtons>
          : <DivResetPasswordHeader className="border-left border-top border-right"> 
              Reset Password
            </DivResetPasswordHeader>
        }
        {
          !isResetPasswordVisible
          ? (
            isLogInTabVisible
            ? <LogIn showResetPassword={showResetPassword} />
            : <Registration />
          )
          : <ResetPassword hideResetPassword={hideResetPassword} />
        }
      </div>
    </DivAuthWrapper>
  )
}

const DivAuthWrapper = styled.div`
  grid-area: 1 / 1 / 4 / 4;
  position: absolute;
  overflow: auto;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  z-index: 16;
  > div {
    position: absolute;
    margin-top: 2.5em;
    background: #f8f9fa;
    width: auto;
    padding: 2rem;
    min-width: 300px;
    left: 50%;
    transform: translateX(-50%);
  }
`

const DivAuthButtons = styled.div`
  width: 100%;
  > button {
    width: 50%;
    display: inline-block;
    border-radius: 0;
    padding: 0 .5em 0 .5em;
  }
`

const DivResetPasswordHeader = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1em;
`
