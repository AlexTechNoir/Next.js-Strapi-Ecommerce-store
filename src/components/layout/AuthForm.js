import React, { useState } from 'react'
import { DivAuthWrapper, DivAuthButtons, DivResetPasswordHeader } from '../../styles'

import LogIn from './header/authForm/LogIn'
import Registration from './header/authForm/Registration'
import ResetPassword from './header/authForm/ResetPassword'

export default function AuthForm({ isLogInTabVisible, closeAuthModal, handleVisibility }) {
  const [ isResetPasswordVisible, setIsResetPasswordVisible ] = useState(false)
  const [ email, setEmail ] = useState('')
  const [ name, setName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConfirm, setPasswordConfirm ] = useState('')

  const handleRegistrationSubmit = e => {
    e.preventDefault()
    if (password === passwordConfirm && password.length >= 6) {
      alert(`Your email is: ${email}, \nyour name is: ${name}, \nyour password is: ${password}.`)
    } else if (password !== passwordConfirm) {
      alert('Passwords should coincide.')
    } else if (password.length < 6) {
      alert('Password(s) should be 6 characters minimum.')
    }
  }

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
                className={`btn ${isLogInTabVisible ? "btn-light" : "btn-white"} border-left border-top border-right shadow-none`} 
                onClick={e => handleVisibility(e)}
              >
                Sing In
              </button>
              <button 
                type="button" 
                name="singUp" 
                className={`btn ${isLogInTabVisible ? "btn-white" : "btn-light"} border-left border-top border-right shadow-none`} 
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
