import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import CartContext from '../../context/cartContext'

import CartListItem from './cartList/CartListItem'
import PayPalCheckoutButton from './cartList/PayPalCheckoutButton'

export default function CartList({ cartList, isCurrencySet, currency, currencyRate, assignProductAmountInCart }) {
  const { cartBadgeToggle, setCartBadgeToggle } = useContext(CartContext)

  const [ totalPrice, setTotalPrice ] = useState(0)
  const [ totalDiscountedPrice, setTotalDiscountedPrice ] = useState(0)
  const amountSaved = ((totalPrice - totalDiscountedPrice) * currencyRate).toFixed(2)

  const areThereAnyDiscountsInCart = cartList.some(i => i.attributes.discount.data !== null)

  const estimateTotalPrice = () => {
    // cart list from localStorage with product ids and chosen amount ↓
    const cartListWithAmounts = JSON.parse(localStorage.cartList)
    // product list with prices and w/o chosen amount, fetched based on ids in cart list from localStorage ↓
    const cartListWithPrices = cartList

    const cartItems = cartListWithAmounts.map(itemWithAmount => {
      for (let i = 0; i < cartListWithPrices.length; i++) {
        if (itemWithAmount.id === cartListWithPrices[i].id) { 
          
          itemWithAmount.price = cartListWithPrices[i].attributes.price

          return itemWithAmount
        }
      }
    })

    let allPrices = cartItems.map(i => Number((i.price * i.selectedAmount).toFixed(2)))

    if (allPrices.length === 1) {
      setTotalPrice(allPrices[0])
    } else {
      const sumOfPrices = allPrices.reduce((acc, i) => acc + i, 0)

      setTotalPrice(sumOfPrices)
    }

    if (areThereAnyDiscountsInCart) {

      const discountedCartItems = cartListWithAmounts.map(itemWithAmount => {
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

      const allDiscountedPrices = discountedCartItems
        .map(i => Number((i.price * i.selectedAmount).toFixed(2)))

      if (allDiscountedPrices.length < 2) {
        setTotalDiscountedPrice(allDiscountedPrices[0])
      } else {
        const sumOfDiscountedPrices = allDiscountedPrices.reduce((acc, i) => acc + i, 0)
  
        setTotalDiscountedPrice(sumOfDiscountedPrices)
      }
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
                currencyRate={currencyRate}
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
                !areThereAnyDiscountsInCart
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
          </div>
        ) : (
          <div className="loader"></div>
        )
      }
      {
        areThereAnyDiscountsInCart && isCurrencySet
        ? (
          <h4 className="text-success">
            You will save <b>{currency}&nbsp;{amountSaved}</b> on this purchase
          </h4>
        ) : null
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
