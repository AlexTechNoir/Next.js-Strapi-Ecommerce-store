import CartContext from '../context/cartContext'
import CookiesContext from '../context/cookiesContext'
import CurrencyContext from '../context/currencyContext'
import RatingsContext from '../context/ratingsContext'
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
  const [ cartList, setCartList ] = useState([])
  const [ cartSubTotalPrice, setCartSubTotalPrice ] = useState(0)
  const [ fetchedRates, setFetchedRates ] = useState({})
  const [ currency, setCurrency ] = useState('$')
  const [ ratings, setRatings ] = useState([])
  const [ areCookiesAccepted, setAreCookiesAccepted ] = useState(false)

  useEffect(async () => {
    if (localStorage.getItem('cartList') === null) {
      localStorage.setItem('cartList', JSON.stringify([]))
    }

    if (localStorage.getItem('currency') === null) {
      localStorage.setItem('currency', JSON.stringify('$'))
    }

    if (localStorage.getItem('ratings') === null) {
      localStorage.setItem('ratings', JSON.stringify([]))
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
        setCartList(JSON.parse(localStorage.cartList))
        setFetchedRates(r.rates)
        setCurrency(JSON.parse(localStorage.currency))
        setRatings(JSON.parse(localStorage.ratings))
      })

    evaluateTotalPrice()
  },[])

  const refreshCart = () => setCartList(JSON.parse(localStorage.cartList))

  const clearCart = () => {
    localStorage.setItem('cartList', JSON.stringify([]))
    setCartList(JSON.parse(localStorage.cartList))

    window.scrollTo(0,0)
  }

  const evaluateTotalPrice = () => {
    const cartList = JSON.parse(localStorage.cartList)

    if (cartList.length === 0) {
      setCartSubTotalPrice(0)
    } else if (cartList.length === 1) {
      const cartSubTotalPrice = (cartList[0].totalPrice * cartList[0].discount).toFixed(2)
      setCartSubTotalPrice(cartSubTotalPrice)
    } else {
      const cartSubTotalPrice = cartList.reduce((acc, cur) => acc + (cur.totalPrice * cur.discount), 0)
      setCartSubTotalPrice(cartSubTotalPrice)
    }
  }

  const refreshCurrency = () => setCurrency(JSON.parse(localStorage.currency))

  const refreshRatings = () => setRatings(JSON.parse(localStorage.ratings))

  return (
    <CookiesContext.Provider value={{
      areCookiesAccepted,
      setAreCookiesAccepted      
    }}>
      <CartContext.Provider value={{
        cartList,
        cartSubTotalPrice,
        refreshCart,
        clearCart,
        evaluateTotalPrice
      }}>
        <CurrencyContext.Provider value={{
          fetchedRates,
          currency,
          refreshCurrency
        }}>
          <RatingsContext.Provider value={{ refreshRatings }}>
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
          </RatingsContext.Provider>
        </CurrencyContext.Provider>
      </CartContext.Provider>
    </CookiesContext.Provider>
  )
}
