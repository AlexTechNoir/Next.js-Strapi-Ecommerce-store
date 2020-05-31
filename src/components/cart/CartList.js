import React from 'react'
import { DivCartList } from '../../styles'

import CartListItem from './cartList/CartListItem'
import PayPalCheckoutButton from './cartList/PayPalCheckoutButton'

export default function CartList({ cartList, clearCart, cartSubTotalPrice }) {
  const tax = cartSubTotalPrice * 0.1
  const cartTotalPrice = tax + cartSubTotalPrice

  return (
    <DivCartList>
      <div>
        { 
          cartList.map(cartListItem => {
            return <CartListItem key={cartListItem.id} cartListItem={cartListItem} />
          })
        }
      </div>
      <button 
        type="button" 
        className="btn btn-danger"
        onClick={() => clearCart()}
      >
        Clear cart
      </button>
      <div>
        <h2>
          Subtotal price: {cartSubTotalPrice}
        </h2>
        <h2>
          Tax: {tax}
        </h2>
        <h1>
          Total price: {cartTotalPrice}
        </h1>
      </div>
      <PayPalCheckoutButton cartTotalPrice={cartTotalPrice} clearCart={clearCart} />
    </DivCartList>
  )
}
