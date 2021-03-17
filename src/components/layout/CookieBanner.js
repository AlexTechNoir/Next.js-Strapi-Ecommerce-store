import styled from 'styled-components'

export default function CookieBanner() {
  const rejectCookies = () => {
    localStorage.setItem('areCookiesAccepted', 'false')
    localStorage.setItem('isCookieBannerVisible', 'false')
  }
  
  const acceptCookies = () => {
    localStorage.setItem('areCookiesAccepted', 'true')
    localStorage.setItem('isCookieBannerVisible', 'false')
  }

  return (
    <DivCookieBanner>
      <p>This demo website uses third party cookies from Google Analytics and Facebook Comments plugin. Please, accept, reject or manage settings. You can change your mind anytime by clicking 'Cookies' below.</p>
      <button type="button" className="btn btn-danger" onClick={rejectCookies}>Reject all</button>
      <button type="button" className="btn btn-primary">Manage cookie settings</button>
      <button type="button" className="btn btn-success" onClick={acceptCookies}>Accept all</button>
    </DivCookieBanner>
  )
}

const DivCookieBanner = styled.div`
  grid-area: 1 / 1 / 4 / 4;
  position: fixed;
  width: 98%;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: .1rem 0.1rem 1rem 0.1rem;
  background: white;
  padding: 1em;
  border-radius: 15px;
  z-index: 20;
  > button {
    margin: .3em;
  }
`
