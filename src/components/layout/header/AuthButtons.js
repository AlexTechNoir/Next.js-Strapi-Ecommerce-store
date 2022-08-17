export default function AuthButtons({ handleAuthModalVisibility }) {
  return (
    <>
      <button 
        className="btn btn-link" 
        type="button" 
        name="logIn" 
        onClick={e => handleAuthModalVisibility(e)}
      > 
        Log In 
      </button>
      <button 
        className="btn btn-link" 
        type="button" 
        name="singUp" 
        onClick={e => handleAuthModalVisibility(e)}
      > 
        Sign Up 
      </button>
    </>
  )
}
