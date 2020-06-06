import React from 'react'
import { DivCartList } from '../../styles'

import CartListItem from './cartList/CartListItem'
import PayPalCheckoutButton from './cartList/PayPalCheckoutButton'

export default function CartList({ cartList, clearCart, cartSubTotalPrice, fetchedRates, currency }) {
  let currencyRate = 1
  
  if (currency === '$') {
    currencyRate = fetchedRates.USD
  } else if (currency === '₽') {
    currencyRate = fetchedRates.RUB
  } else if (currency === 'Ch¥') {
    currencyRate = fetchedRates.CNY
  } else if (currency === 'Jp¥') {
    currencyRate = fetchedRates.JPY
  } else if (currency === '₩') {
    currencyRate = fetchedRates.KRW
  } else if (currency === '₹') {
    currencyRate = fetchedRates.INR
  }

  const subTotal = (cartSubTotalPrice * currencyRate).toFixed(2)
  const tax = (subTotal * 0.1).toFixed(2)
  const totalPrice = (+tax + +subTotal).toFixed(2)

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
          Subtotal price: {currency} {subTotal}
        </h2>
        <h2>
          Tax: {currency} {tax}
        </h2>
        <h1>
          Total price: {currency} {totalPrice}
        </h1>
      </div>
      <PayPalCheckoutButton currency={currency} totalPrice={totalPrice} clearCart={clearCart} />
    </DivCartList>
  )
}
