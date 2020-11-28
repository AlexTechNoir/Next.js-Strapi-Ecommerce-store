import styled from 'styled-components'

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
          <span>Subtotal price:</span>&nbsp;
          <b>{currency} {subTotal}</b>
        </h2>
        <h2>
          <span>Tax:</span>&nbsp;
          <b>{currency} {tax}</b>
        </h2>
        <h1>
          <span>Total price:</span>&nbsp;
          <b>{currency} {totalPrice}</b>
        </h1>
      </div>
      <PayPalCheckoutButton currency={currency} totalPrice={totalPrice} clearCart={clearCart} />
    </DivCartList>
  )
}

const DivCartList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > :first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.5em;
  }
  > :nth-child(2) {
    align-self: flex-start;
    margin-bottom: 2.5em;
  }
  > :nth-child(3) {
    display: flex;
    flex-direction: column;
    > h1, h2 {
      display: flex;
      flex-wrap: wrap;
    }
  }
  > :nth-child(4) {
    align-self: flex-start;
    width: 100%;

    @media only screen and (min-width: 426px) {
      width: 290px;
    }
  }
`
