import Context from '../context'
import { useState, useEffect } from 'react'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function ContextProvider({ Component, pageProps }) {
  const [ cartList, setCartList ] = useState([])
  const [ cartSubTotalPrice, setCartSubTotalPrice ] = useState(0)
  const [ fetchedRates, setFetchedRates ] = useState({})
  const [ currency, setCurrency ] = useState('€')
  const [ ratings, setRatings ] = useState([])
  const [ areCookiesAccepted, setAreCookiesAccepted ] = useState(false)

  useEffect(async () => {
    if (localStorage.getItem('cartList') === null) {
      localStorage.setItem('cartList', JSON.stringify([]))
    }

    if (localStorage.getItem('currency') === null) {
      localStorage.setItem('currency', JSON.stringify('€'))
    }

    if (localStorage.getItem('ratings') === null) {
      localStorage.setItem('ratings', JSON.stringify([]))
    }

    await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.NEXT_PUBLIC_ERAPI_ACCESS_KEY}`)
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
        console.log(r.rates)
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
    <Context.Provider value={{
      cartList,
      cartSubTotalPrice,
      fetchedRates,
      currency,
      areCookiesAccepted,
      setAreCookiesAccepted,
      refreshCart,
      clearCart,
      evaluateTotalPrice,
      refreshCurrency,
      refreshRatings
    }}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}
