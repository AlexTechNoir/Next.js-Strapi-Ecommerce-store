import React, { useState } from 'react'
import { DivAuthWrapper, DivAuthButtons, DivResetPasswordHeader } from '../../styles'

import LogIn from './authForm/LogIn'
import Registration from './authForm/Registration'
import ResetPassword from './authForm/ResetPassword'

export default function AuthForm({ isLogInTabVisible, closeAuthModal, handleVisibility }) {
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
                onClick={e => handleVisibility(e)}
              >
                Sing In
              </button>
              <button 
                type="button" 
                name="singUp" 
                className={`btn ${isLogInTabVisible ? "btn-secondary" : "btn-light"} border-left border-top border-right shadow-none`} 
                onClick={e => handleVisibility(e)}
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
