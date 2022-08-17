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
  const [ itemsAmountInCart, setItemsAmountInCart ] = useState(null)
  const [ cartList, setCartList ] = useState([])
  const [ totalPriceInCart, setTotalPriceInCart ] = useState(0)
  const [ totalDiscountedPriceInCart, setTotalDiscountedPriceInCart ] = useState(0)

  const areThereAnyDiscountsInCart = cartList.some(i => i.attributes.discount.data !== null)

  const assignProductAmountInCart = async () => { 

    if (localStorage.getItem('cartList') !== null) {

      const cartList = JSON.parse(localStorage.cartList)
      const ids = cartList.map(i => i.id)
      
      // fetch items from CMS based on ids derived from localStorage cart list
      const data = await fetch(`/api/cart?ids=${ids}`)
        .then(r => {
          if (r.status >= 400) {
            const err = new Error('Error in _app.js, in assignProductAmountInCart(), fetch .then statement, if (r.status >= 400) condition')
            err.data = r
            throw err
          }
          return r.json()
        })
        .catch(err => console.error('Error in pages/_app.js, assignProductAmountInCart() function, .catch statement, err object:', err))
      
      const productsInCart = data.data.products.data
      // sort in alphabetical order
      const sortedProductsInCart = productsInCart.sort((a, b) => {
        const stringA = a.attributes.title.toUpperCase()
        const stringB = b.attributes.title.toUpperCase()

        return (stringA < stringB) ? -1 : (stringA > stringB) ? 1 : 0
      })
      
      setCartList(sortedProductsInCart)
      
      const cartListLength = cartList.length
      setItemsAmountInCart(cartListLength)
      
    } else {
      setItemsAmountInCart(0)
    }
  }

  const estimateTotalPriceOfAllItems = () => {

    // cart list from localStorage with items' selected amount
    const cartListWithAmounts = JSON.parse(localStorage.cartList)

    // product list with prices and w/o selected amount, fetched based on ids in cart list from localStorage (in assignProductAmountInCart() function above)
    const cartListWithPrices = cartList

    // create cart list with both <price> and <selectedAmount> keys (we're putting <price> inside cart list with <selectedAmount>)
    const cartItems = cartListWithAmounts.map(itemWithAmount => {
      for (let i = 0; i < cartListWithPrices.length; i++) {
        if (itemWithAmount.id === cartListWithPrices[i].id) { 
          
          itemWithAmount.price = cartListWithPrices[i].attributes.price

          return itemWithAmount
        }
      }
    })

    let allPrices = cartItems.map(i => Number((i.price * i.selectedAmount).toFixed(2)))

    if (allPrices.length === 1) {

      setTotalPriceInCart(allPrices[0])

    } else {

      const sumOfPrices = allPrices.reduce((acc, i) => acc + i, 0)
      setTotalPriceInCart(sumOfPrices)
    }

    // if cart contains item(s) with discount we create another cart list with discounts, because in UI we need to show both prices with and w/o discount for higher chance of conversion
    if (areThereAnyDiscountsInCart) {

      const discountedCartItems = cartListWithAmounts.map(itemWithAmount => {
        for (let i = 0; i < cartListWithPrices.length; i++) {
          if (itemWithAmount.id === cartListWithPrices[i].id) {

            if (cartListWithPrices[i].attributes.discount.data === null) {
              itemWithAmount.price = cartListWithPrices[i].attributes.price
            } else {
              const discountMultiplier = cartListWithPrices[i].attributes.discount.data.attributes.discountMultiplier
              itemWithAmount.price = cartListWithPrices[i].attributes.price * discountMultiplier
            }

            return itemWithAmount
          }
        }
      })

      const allDiscountedPrices = discountedCartItems.map(i => Number((i.price * i.selectedAmount).toFixed(2)))

      if (allDiscountedPrices.length < 2) {

        setTotalDiscountedPriceInCart(allDiscountedPrices[0])

      } else {

        const sumOfDiscountedPrices = allDiscountedPrices.reduce((acc, i) => acc + i, 0)  
        setTotalDiscountedPriceInCart(sumOfDiscountedPrices)
      }
    }
  }

  // currency ↓
  const [ fetchedRates, setFetchedRates ] = useState({})
  const [ currency, setCurrency ] = useState('$')
  const [ currencyCode, setCurrencyCode ] = useState('USD')
  const [ currencyRate, setCurrencyRate ] = useState(1)
  const [ isCurrencySet, setIsCurrencySet ] = useState(false)
  
  const refreshCurrency = () => {

    // we toggle isCurrencySet state to toggle loader
    setIsCurrencySet(false)
    setCurrency(JSON.parse(localStorage.currency))
    setIsCurrencySet(true)
  }

  // setting up currency code
  const setCurrencyCodes = async () => {

    // we toggle isCurrencySet state to toggle loader
    setIsCurrencySet(false)

    if (localStorage.getItem('currency') === null) {
      localStorage.setItem('currency', JSON.stringify('$'))
      setIsCurrencySet(true)
    }

    await fetch('/api/currencyRates')
      .then(r => {
        if (r.status >= 400) {
          return r.json().then(errResData => {
            const err = new Error('Error in _app.js, in setCurrencySign(), fetch .then statement, if (r.status >= 400) condition')
            err.data = errResData
            throw err
          })
        }
        return r.json()
      }).then(r => {
        setFetchedRates(r.rates)
        refreshCurrency()
      }).catch(err => console.error('Error in pages/_app.js, setCurrencyCodes() function, .catch statement, err object:', err))
  }

  // setting up currency rate based on curreny code
  const setCurrencyRates = () => {
    switch (currency) {
      case '€':
        if (fetchedRates.EUR === undefined) {
          // fallback
          setCurrencyRate(1)
          setCurrencyCode('EUR')
        } else {          
          setCurrencyRate(fetchedRates.EUR)
          setCurrencyCode('EUR')
        }
        break

      case '£':        
        if (fetchedRates.GBP === undefined) {
          // fallback
          setCurrencyRate(1)
          setCurrencyCode('GBP')
        } else {          
          setCurrencyRate(fetchedRates.GBP)
          setCurrencyCode('GBP')
        }
        break

      default: 
        setCurrencyRate(1)
        setCurrencyCode('USD')
        break
    }
  }
  
  useEffect(() => {
    setCurrencyCodes()
  },[])

  useEffect(() => {
    setCurrencyRates()
  },[currency]) // triggers here in setCurrencyRates()

  return (
    <CookiesContext.Provider value={{ areCookiesAccepted, setAreCookiesAccepted }}>
      <CurrencyContext.Provider value={{ isCurrencySet, currency, currencyCode, currencyRate, refreshCurrency }}>
        <CartContext.Provider value={{ 
          cartBadgeToggle, 
          setCartBadgeToggle, 
          itemsAmountInCart,
          cartList, 
          setCartList,
          assignProductAmountInCart,
          estimateTotalPriceOfAllItems,
          totalPriceInCart,
          totalDiscountedPriceInCart,
          areThereAnyDiscountsInCart
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
          
        </CartContext.Provider>
      </CurrencyContext.Provider>
    </CookiesContext.Provider>
  )
}
