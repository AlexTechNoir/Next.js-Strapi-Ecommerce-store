
import React, { useEffect, useContext } from 'react'
import Head from 'next/head'
import { DivCart } from '../styles'
import Context from '../context'

import Layout from '../components/Layout'
import CartList from '../components/cart/CartList'

export default function Cart() {
  const { cartList, clearCart, cartSubTotalPrice, evaluateTotalPrice } = useContext(Context)

  useEffect(() => {
    evaluateTotalPrice()
  }, [])

  return (
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <DivCart>
          {
            !cartList || cartList.length < 1
            ? <h2>
                <div>Your shopping cart is empty</div>
              </h2>
            : <CartList cartList={cartList} clearCart={clearCart} cartSubTotalPrice={cartSubTotalPrice} />
          }
        </DivCart>
      </Layout>
    </React.Fragment>
  )
}
