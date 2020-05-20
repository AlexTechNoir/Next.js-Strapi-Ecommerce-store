
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { DivCart } from '../styles'

import Layout from '../components/Layout'
import CartList from '../components/cart/CartList'

export default function Cart() {
  const [ cartList, setCartList ] = useState([])

  useEffect(() => {
    if (localStorage.getItem('cartList') === null) {
      localStorage.setItem('cartList', JSON.stringify([]))
      setCartList(JSON.parse(localStorage.cartList))
    } else if (localStorage.getItem('cartList') !== null) {
      setCartList(JSON.parse(localStorage.cartList))
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <DivCart className="w-100">
          {
            cartList.length < 1
            ? <div className="d-flex justify-content-center">
                <h2>Your shopping cart is empty</h2>
              </div>
            : <CartList cartList={cartList} />
          }
        </DivCart>
      </Layout>
    </React.Fragment>
  )
}
