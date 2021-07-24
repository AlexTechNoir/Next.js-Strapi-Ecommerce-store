import { useEffect, useContext } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import CurrencyContext from '../context/currencyContext'
import CartContext from '../context/cartContext'
import dynamic from 'next/dynamic'

const CartList = dynamic(() => import('../components/cart/CartList'))

export default function Cart() {
  const { fetchedRates, currency } = useContext(CurrencyContext)
  const { cartList, clearCart, cartSubTotalPrice, evaluateTotalPrice } = useContext(CartContext)

  useEffect(() => {
    evaluateTotalPrice()
  }, [])

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

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
              cartSubTotalPrice={cartSubTotalPrice}
            />
        }
      </DivCart>
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
