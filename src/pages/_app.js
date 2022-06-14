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
  
  const refreshCurrency = () => setCurrency(JSON.parse(localStorage.currency))  

  // useEffect for currency ↓
  useEffect(async () => {
    if (localStorage.getItem('currency') === null) {
      localStorage.setItem('currency', JSON.stringify('$'))
    }

    await fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.NEXT_PUBLIC_OERAPI_ACCESS_KEY}`)
      .then(r => {
        if (r.status >= 400) {
          return r.json().then(errResData => {
            const err = new Error('Error.')
            err.data = errResData
            throw err
          })
        }
        return r.json()
      }).then(r => {
        setFetchedRates(r.rates)
        setCurrency(JSON.parse(localStorage.currency))
      })
  },[])

  return (
    <CookiesContext.Provider value={{
      areCookiesAccepted,
      setAreCookiesAccepted      
    }}>
      <CartContext.Provider value={{
        cartBadgeToggle,
        setCartBadgeToggle
      }}>
        <CurrencyContext.Provider value={{
          fetchedRates,
          currency,
          refreshCurrency
        }}>
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
