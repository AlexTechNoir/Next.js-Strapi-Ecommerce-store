import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import CartContext from '../../context/cartContext'

import CartListItem from './cartList/CartListItem'
import PayPalCheckoutButton from './cartList/PayPalCheckoutButton'

export default function CartList({ cartList, isCurrencySet, fetchedRates, currency, assignProductAmountInCart }) {
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
  const [ totalDiscountedPrice, setTotalDiscountedPrice ] = useState(0)

  const amountSaved = (totalPrice - totalDiscountedPrice).toFixed(2)

  const areThereAnyDiscountsInCart = cartList.find(i => i.attributes.discount.data === null)

  const estimateTotalPrice = () => {
    // cart list from localStorage with product ids and chosen amount in cart ↓
    const cartListWithAmounts = JSON.parse(localStorage.cartList)
    // product list with prices and w/o chosen amount, fetched based on ids in cart list from localStorage ↓
    const cartListWithPrices = cartList

    const allPrices = cartListWithAmounts.map(itemWithAmount => {
      for (let i = 0; i < cartListWithPrices.length; i++) {
        if (itemWithAmount.id === cartListWithPrices[i].id) { 
          itemWithAmount.price = cartListWithPrices[i].attributes.price

          return itemWithAmount
        }
      }
    })

    const totalEstimatedPrice = allPrices
      .map(i => (i.price * currencyRate * parseFloat(i.selectedAmount)).toFixed(2))
      .reduce((acc, i) => parseFloat(acc) + parseFloat(i), 0)

    setTotalPrice(totalEstimatedPrice.toFixed(2))

    if (areThereAnyDiscountsInCart !== undefined) {

      const allDiscountedPrices = cartListWithAmounts.map(itemWithAmount => {
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

      const totalEstimatedDiscountedPrice = allDiscountedPrices
        .map(i => (i.price * currencyRate * parseFloat(i.selectedAmount)).toFixed(2))
        .reduce((acc, i) => parseFloat(acc) + parseFloat(i), 0)
  
      setTotalDiscountedPrice(totalEstimatedDiscountedPrice.toFixed(2))
    }
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
      <div className="cart-items-wrapper">
        { 
          cartList.map(cartListItem => {
            return (
              <CartListItem 
                key={cartListItem.id} 
                cartListItem={cartListItem} 
                assignProductAmountInCart={assignProductAmountInCart}
                estimateTotalPrice={estimateTotalPrice}
                isCurrencySet={isCurrencySet}
              />
            )
          })
        }
      </div>
      <button 
        type="button" 
        className="btn btn-danger clear-cart-button"
        onClick={() => clearCart()}
      >
        Clear cart
      </button>
      {
        isCurrencySet
        ? (
          <div className="total-price">
            <h1>
              <span>Total price:</span>&nbsp;
              {
                areThereAnyDiscountsInCart === undefined
                ? (
                  <b>{currency} {(totalPrice * currencyRate).toFixed(2)}</b>
                ) : (
                  <span className="d-flex flex-column">
                    <s>{currency} {(totalPrice * currencyRate).toFixed(2)}</s>
                    <b className="text-danger">{currency} {(totalDiscountedPrice * currencyRate).toFixed(2)}</b>
                  </span>
                )
              }
            </h1>
            <h4 className="text-success">You will save <b>{currency}&nbsp;{amountSaved}</b> on this purchase</h4>
          </div>
        ) : (
          <div className="loader"></div>
        )
      }
      <PayPalCheckoutButton 
        totalPrice={areThereAnyDiscountsInCart ? totalDiscountedPrice * currencyRate : totalPrice * currencyRate} 
        currency={currency} 
        clearCart={clearCart} 
      />
    </DivCartList>
  )
}

const DivCartList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > .cart-items-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.5em;
  }
  > .clear-cart-button {
    align-self: flex-start;
    margin-bottom: 2.5em;
  }
  > .total-price {
    display: flex;
    flex-direction: column;
    > h1 {
      display: flex;
      flex-wrap: wrap;
    }
  }
`
