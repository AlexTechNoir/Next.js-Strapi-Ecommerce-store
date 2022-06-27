import CartContext from '../context/cartContext'
import CookiesContext from '../context/cookiesContext'
import CurrencyContext from '../context/currencyContext'
import { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import Head from 'next/head'
import { GA_TRACKING_ID } from '../../lib/gtag'

import Layout from '../components/Layout'

export default function ContextProvider({ Component, pageProps }) {
  // cookies ↓
  const [ areCookiesAccepted, setAreCookiesAccepted ] = useState(false)

  // cart ↓
  const [ cartBadgeToggle, setCartBadgeToggle ] = useState(true)

  // currency ↓
  const [ fetchedRates, setFetchedRates ] = useState({})
  const [ currency, setCurrency ] = useState('$')
  const [ currencyRate, setCurrencyRate ] = useState(1)
  const [ isCurrencySet, setIsCurrencySet ] = useState(false)
  
  const refreshCurrency = () => {
    setIsCurrencySet(false)
    setCurrency(JSON.parse(localStorage.currency))
    setIsCurrencySet(true)
  }

  // useEffect for setting up currency sign ↓
  useEffect(async () => {
    setIsCurrencySet(false)

    if (localStorage.getItem('currency') === null) {
      localStorage.setItem('currency', JSON.stringify('$'))
      setIsCurrencySet(true)
    }

    await fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.NEXT_PUBLIC_OERAPI_ACCESS_KEY}`)
      .then(r => {
        if (r.status >= 400) {
          return r.json().then(errResData => {
            const err = new Error('Error')
            err.data = errResData
            throw err
          })
        }
        return r.json()
      }).then(r => {
        setFetchedRates(r.rates)
        refreshCurrency()
      }).catch(err => console.error(err))
  },[])

  // useEffect for setting up currency rate based on curreny sign ↓
  useEffect(() => {
    switch (currency) {
      case '€':
        setCurrencyRate(fetchedRates.EUR)
        break
      case '₽':
        setCurrencyRate(fetchedRates.RUB)
        break
      case 'Ch¥':
        setCurrencyRate(fetchedRates.CNY)
        break
      case 'Jp¥':
        setCurrencyRate(fetchedRates.JPY)
        break
      case '₩':
        setCurrencyRate(fetchedRates.KRW)
        break
      case '₹':
        setCurrencyRate(fetchedRates.INR)
        break
      default: 
        setCurrencyRate(1)
        break
    }
  },[currency])

  return (
    <CookiesContext.Provider value={{ areCookiesAccepted, setAreCookiesAccepted }}>
      <CartContext.Provider value={{ cartBadgeToggle, setCartBadgeToggle }}>
        <CurrencyContext.Provider value={{ isCurrencySet, currency, currencyRate, refreshCurrency }}>
          <Head>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script dangerouslySetInnerHTML={{
              __html: `
                window['ga-disable-${GA_TRACKING_ID}'] = ${!areCookiesAccepted}
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }} />
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CurrencyContext.Provider>
      </CartContext.Provider>
    </CookiesContext.Provider>
  )
}
