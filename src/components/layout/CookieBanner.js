import styled from 'styled-components'

export default function CookieBanner({ isCookieBannerVisible, setAreCookiesAccepted, setIsCookieBannerVisible }) {
  const rejectCookies = () => {
    localStorage.setItem('areCookiesAccepted', 'false')
    setAreCookiesAccepted(false)
    localStorage.setItem('isCookieBannerVisible', 'false')
    setIsCookieBannerVisible(false)
  }

  const acceptCookies = () => {
    localStorage.setItem('areCookiesAccepted', 'true')
    setAreCookiesAccepted(true)
    localStorage.setItem('isCookieBannerVisible', 'false')
    setIsCookieBannerVisible(false)
  }

  return (
    <DivCookieBanner isCookieBannerVisible={isCookieBannerVisible}>
      <p>This demo website uses cookies for analytics and social media. Please, accept or reject them. You can change your mind anytime by clicking 'Cookie consent' below.</p>
      <button type="button" className="btn btn-danger" onClick={rejectCookies}>Reject all</button>
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
  z-index: 100;
  display: ${props => props.isCookieBannerVisible ? 'block' : 'none'};
  > button {
    margin: .3em;
  }
`
