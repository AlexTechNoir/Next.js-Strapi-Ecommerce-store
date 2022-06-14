import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import CartContext from '../../context/cartContext'

import CartListItem from './cartList/CartListItem'
import PayPalCheckoutButton from './cartList/PayPalCheckoutButton'

export default function CartList({ cartList, fetchedRates, currency, assignProductAmountInCart }) {
  const { cartBadgeToggle, setCartBadgeToggle } = useContext(CartContext)

  let currencyRate = 1
  
  if (currency === '€') {
    currencyRate = fetchedRates.EUR
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

  const [ totalPrice, setTotalPrice ] = useState(0)

  const estimateTotalPrice = () => {
    const cartListWithAmounts = JSON.parse(localStorage.cartList)
    const cartListWithPrices = cartList
    
    cartListWithAmounts.map(itemWithAmount => {
      
      cartListWithPrices.forEach(itemWithPrice => {

        if (itemWithAmount.id === itemWithPrice.id) {
          
          itemWithAmount.price = itemWithPrice.attributes.price
          
        }
      })
    })
    
    const totalEstimatedPrice = cartListWithAmounts
      .map(i => (i.price * i.selectedAmount).toFixed(2))
      .reduce((acc, i) => parseFloat(acc) + parseFloat(i), 0)
    
    setTotalPrice(totalEstimatedPrice.toFixed(2))
  }

  const clearCart = () => {
    localStorage.removeItem('cartList')
    assignProductAmountInCart()
    setCartBadgeToggle(!cartBadgeToggle)
  }

  useEffect(() => {
    estimateTotalPrice()
  },[])

  return (
    <DivCartList>
      <div>
        { 
          cartList.map(cartListItem => {
            return (
              <CartListItem 
                key={cartListItem.id} 
                cartListItem={cartListItem} 
                assignProductAmountInCart={assignProductAmountInCart}
                estimateTotalPrice={estimateTotalPrice}
              />
            )
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
        <h1>
          <span>Total price:</span>&nbsp;
          <b>{currency} {(totalPrice * currencyRate).toFixed(2)}</b>
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
    > h1 {
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
