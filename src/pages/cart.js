import { useEffect, useContext } from 'react'
import styled from 'styled-components'
import CartContext from '../context/cartContext'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const CartList = dynamic(() => import('../components/cart/CartList'))

export default function Cart() {
  const { itemsAmountInCart, assignProductAmountInCart } = useContext(CartContext)

  useEffect(() => {
    assignProductAmountInCart()
  }, [])
  
  return (
    <> 
      <Head>
        <title>Your cart - Alimazon</title>
      </Head>

      <DivCart>
        {
          itemsAmountInCart === null 
          ? (
            <div className="loader"></div>
          ) 
          : itemsAmountInCart < 1
          ? (
            <h2 className="empty-cart-message">
              <div>Your shopping cart is empty</div>
            </h2>
          ) 
          : <CartList assignProductAmountInCart={assignProductAmountInCart} />
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
  > .empty-cart-message {
    display: flex;
    justify-content: center;
  }
`
