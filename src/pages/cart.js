import { useEffect, useContext } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Context from '../context'
import dynamic from 'next/dynamic'
import { GA_TRACKING_ID } from '../../lib/gtag'

import Layout from '../components/Layout'
const CartList = dynamic(() => import('../components/cart/CartList'))

export default function Cart() {
  const { 
    cartList, 
    clearCart, 
    cartSubTotalPrice, 
    fetchedRates, 
    currency, 
    evaluateTotalPrice, 
    areCookiesAccepted 
  } = useContext(Context)

  useEffect(() => {
    evaluateTotalPrice()
  }, [])

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
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
        <DivCart>
          {
            !cartList || cartList.length < 1
            ? <h2>
                <div>Your shopping cart is empty</div>
              </h2>
            : <CartList 
                cartList={cartList} 
                clearCart={clearCart} 
                fetchedRates={fetchedRates}
                currency={currency}
                cartSubTotalPrice={cartSubTotalPrice} />
          }
        </DivCart>
      </Layout>
    </>
  )
}

const DivCart = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  > h2 {
    display: flex;
    justify-content: center;
  }
`
