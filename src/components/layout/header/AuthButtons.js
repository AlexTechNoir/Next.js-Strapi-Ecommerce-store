import React from 'react'

export default function AuthButtons({ handleVisibility }) {
  return (
    <>
      <button 
        className="btn btn-link" 
        type="button" 
        name="logIn" 
        onClick={e => handleVisibility(e)}
      > 
        Log In 
      </button>
      <button 
        className="btn btn-link" 
        type="button" 
        name="singUp" 
        onClick={e => handleVisibility(e)}
      > 
        Sign Up 
      </button>
    </>
  )
}
