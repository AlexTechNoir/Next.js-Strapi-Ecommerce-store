import { useState, useEffect, useContext } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import * as gtag from '../../lib/gtag'
import CookiesContext from '../context/cookiesContext'

import Header from './layout/Header'
const AuthForm = dynamic(() => import('./layout/AuthForm'))
import CookieBanner from './layout/CookieBanner'
import Footer from './layout/Footer'

export default function Layout(props) {

  // auth modal ↓
  const [ isAuthModalVisible, setIsAuthModalVisible ] = useState(false)
  const [ isLogInTabVisible, setIsLogInTabVisible ] = useState(null) 

  const handleAuthModalVisibility = e => {
    
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

  // cookies ↓
  const { areCookiesAccepted, setAreCookiesAccepted } = useContext(CookiesContext)

  const [ isCookieBannerVisible, setIsCookieBannerVisible ] = useState(false)

  const router = useRouter()

  const setCookies = () => {

    if (localStorage.getItem('areCookiesAccepted') !== null) {      
      if (localStorage.getItem('areCookiesAccepted') === 'false') {
        setAreCookiesAccepted(false)
      } else {
        setAreCookiesAccepted(true)
      }
    }
  }

  const setCookiesBanner = () => {
    if (
      localStorage.getItem('isCookieBannerVisible') !== null ||
      localStorage.getItem('isCookieBannerVisible') === 'false'
    ) {
      setIsCookieBannerVisible(false)
    } else {
      setIsCookieBannerVisible(true)
    }
  }

  const manageGAScript = () => {    
    if (localStorage.getItem('areCookiesAccepted') === 'true') {

      // initialize script on route change
      const handleRouteChange = url => {
        gtag.pageview(url)
      }
      router.events.on('routeChangeComplete', handleRouteChange)      
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }

    } else if (localStorage.getItem('areCookiesAccepted') === 'false') {

      // delete all GA cookies by expiring them

      document.cookie = '_ga=; Max-Age=0;'

      const cookiePair = document.cookie.split('; ').find(row => row.startsWith('_ga_'))
      if (cookiePair !== undefined) {
        const cookieName = cookiePair.substring(0, cookiePair.indexOf('='))
        document.cookie = `${cookieName}=; Max-Age=0;`
      }      

      document.cookie = '_gid=; Max-Age=0;'
    }
  }
  
  const showCookieBanner = e => {
    e.preventDefault()
    setIsCookieBannerVisible(true)
  }

  useEffect(() => {
    setCookies()
  }, [isCookieBannerVisible]) // triggers here in setCookiesBanner() and showCookieBanner(), and in components/layout/CookieBanner.js in rejectCookies() and acceptCookies()

  useEffect(() => {
    setCookiesBanner()
  }, [areCookiesAccepted]) // triggers here in setCookies(), and in components/layout/CookieBanner.js in rejectCookies() and acceptCookies()

  useEffect(() => {
    manageGAScript()
  }, [router.events, areCookiesAccepted]) // router.events triggers on route change and set here in manageGAScript(); areCookiesAccepted - see comment above

  return (
    <>
      <GlobalStyle />
      <DivGrid>
        <Header handleAuthModalVisibility={handleAuthModalVisibility} />
        {
          isAuthModalVisible
          ? <AuthForm 
              isLogInTabVisible={isLogInTabVisible}
              closeAuthModal={closeAuthModal}
              handleAuthModalVisibility={handleAuthModalVisibility} 
            />
          : null
        }
        {props.children}
        <CookieBanner 
          isCookieBannerVisible={isCookieBannerVisible}
          setAreCookiesAccepted={setAreCookiesAccepted}
          setIsCookieBannerVisible={setIsCookieBannerVisible}
        />
        <Footer showCookieBanner={showCookieBanner} />
      </DivGrid>
    </>
  )
}

const loading = keyframes`
  12.5% {border-radius: 37% 63% 70% 30% / 30% 62% 38% 70%}
  25%   {border-radius: 84% 16% 15% 85% / 55% 79% 21% 45%}
  37.5% {border-radius: 73% 27% 74% 26% / 64% 32% 68% 36%}
  50%   {border-radius: 73% 27% 18% 82% / 52% 32% 68% 48%}
  62.5% {border-radius: 33% 67% 18% 82% / 52% 75% 25% 48%}
  75%   {border-radius: 12% 88% 69% 31% / 10% 66% 34% 90%}
  87.5% {border-radius: 50% 50% 70% 30% / 52% 62% 38% 48%}
`

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

  .loader {
    width: 70px;
    height: 70px;
    padding: 10px;
    background: #fff;
    mix-blend-mode: darken;
    display: grid;
    filter: blur(4px) contrast(10) hue-rotate(270deg);
    &:before, &:after {
      content:"";
      grid-area: 1/1;
      animation: ${loading} 3s infinite linear;
      background:#ff00ff;
      border-radius: 50%;
    }
    &:after {
      animation-delay: -.8s;
    }
  }
`

const DivGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 1200px 1fr;
  height: 100%;
  position: relative;
  
  @media only screen and (max-width: 1220px) {
    grid-template-columns: auto 100% auto;
  }
`
