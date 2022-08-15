import styled from 'styled-components'
import { useEffect, useContext, useState } from 'react'
import CartContext from '../../context/cartContext'
import CurrencyContext from '../../context/currencyContext'
import { useRouter } from 'next/router'

import CartListItem from './cartList/CartListItem'

export default function CartList({ assignProductAmountInCart }) {

  const { isCurrencySet, currency, currencyRate } = useContext(CurrencyContext)
  const { 
    cartList,
    estimateTotalPriceOfAllItems,
    cartBadgeToggle, 
    setCartBadgeToggle, 
    totalPriceInCart, 
    totalDiscountedPriceInCart, 
    areThereAnyDiscountsInCart 
  } = useContext(CartContext)

  const router = useRouter()

  const [ outOfStockMessage, setOutOfStockMessage ] = useState(false)
  const [ isCheckoutButtonDisabled, setIsCheckoutButtonDisabled ] = useState(null)
  const [ itemsWithExceededAmount, setItemsWithExceededAmount ] = useState([])

  const amountSaved = ((totalPriceInCart - totalDiscountedPriceInCart) * currencyRate).toFixed(2)

  // this is DRY helper function and it is inside of checkIfItemsAreAvailable() and goToCheckout() functions below
  const checkItemsAmount = (cartListFromCms, cartListFromLocalStorage) => {

    // here we use .some(), that returns boolean value, to find at least one item being out of stock to trigger the error message and toggle goToCheckout button
    const areAnyOfItemsOutOfStock = cartListFromCms.some(i => i.attributes.available <= 0)    

    // we need to check cartList from CMS against cartList from localStorage, because the former doesn't contain <selectedAmount> value unlike the latter (we got nowhere to put <selectedAmount> value into CMS, because it needs to be tied with user, which requires authentication feature that is not implemented in this project)
    // here we use .filter() to create array of items' ids. We need them, because we toggle border colour of select element of each item individually
    const listOfItemsExceededAvailable = cartListFromCms
      .filter(cartListItemFromCms => {
        for (let i = 0; i < cartListFromLocalStorage.length; i++) {

          // if ids are coincide (meaning it's the same item) and the item is not out of stock and selected amount is greater than available, we return this item
          if (
            cartListItemFromCms.id === cartListFromLocalStorage[i].id
            && cartListItemFromCms.attributes.available > 0
            && cartListFromLocalStorage[i].selectedAmount > cartListItemFromCms.attributes.available
          ) {
            return cartListFromLocalStorage[i].id
          }
        }
      })
      // return id of each item
      .map(i => i.id)

    return { areAnyOfItemsOutOfStock, listOfItemsExceededAvailable }
  } 

  const checkIfItemsAreAvailable = () => {

    const { 
      areAnyOfItemsOutOfStock, 
      listOfItemsExceededAvailable 
    } = checkItemsAmount(cartList, JSON.parse(localStorage.cartList))

    // this state is dependency of useEffect in components/cart/cartList/CartListItem.js. We need to set this state to trigger function inside that useEffect, that toggles border colour
    setItemsWithExceededAmount(listOfItemsExceededAvailable)

    if (areAnyOfItemsOutOfStock || listOfItemsExceededAvailable.length > 0) {
      setOutOfStockMessage(true)
      setIsCheckoutButtonDisabled(true)
    } else {
      setOutOfStockMessage(false)
      setIsCheckoutButtonDisabled(false)
    }
  }

  const clearCart = () => {
    localStorage.removeItem('cartList')
    localStorage.removeItem('order')
    localStorage.removeItem('isFormSubmitted')
    assignProductAmountInCart()
    // toggle cart badge state to make the badge dissappear (in components/layout/header/CartButton.js)
    setCartBadgeToggle(!cartBadgeToggle)
  }

  const goToCheckout = async () => {

    setIsCheckoutButtonDisabled(true)

    const cartList = JSON.parse(localStorage.cartList)
    const ids = cartList.map(i => i.id)

    // fetch values of available amounts of items in cart
    const data = await fetch(`/api/available?ids=${ids}`)
      .then(r => {
        if (r.status >= 400) {
          const err = new Error('Error in src/components/cart/cartList/CartList.js component, goToCheckout() function, if (r.status >= 400) condition')
          err.data = r
          throw err
        }
        return r.json()
      })
      .catch(err => console.error(err))

    const { 
      areThereAnyOutOfStockItems, 
      listOfItemsExceededAvailable 
    } = checkItemsAmount(data, cartList)

    // this state is dependency of useEffect in components/cart/cartList/CartListItem.js. We need to set this state to trigger function inside that useEffect, that toggles border colour
    setItemsWithExceededAmount(listOfItemsExceededAvailable)

    // if there are no out of stock items and no items that exceeded available, we go to checkout page, if not, we reassign product amount in cart to trigger errors
    if (areThereAnyOutOfStockItems || listOfItemsExceededAvailable.length > 0) {
      assignProductAmountInCart()
    } else {
      router.push('/checkout')
    }
  }

  useEffect(() => { 
    estimateTotalPriceOfAllItems()
  },[])

  useEffect(() => {
    checkIfItemsAreAvailable()
  },[cartList]) // triggers in pages/_app.js in assignProductAmountInCart() and in components/checkout/PayPalCheckoutButton.js in onApprove()

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
                estimateTotalPriceOfAllItems={estimateTotalPriceOfAllItems}
                currency={currency}
                currencyRate={currencyRate}
                isCurrencySet={isCurrencySet}
                cartBadgeToggle={cartBadgeToggle}
                setCartBadgeToggle={setCartBadgeToggle} 
                itemsWithExceededAmount={itemsWithExceededAmount}
                checkIfItemsAreAvailable={checkIfItemsAreAvailable}
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
          <>
            <div className="total-price">
              <h1>
                <span>Total price:</span>&nbsp;
                {
                  !areThereAnyDiscountsInCart
                  ? (
                    <b>{currency} {(totalPriceInCart * currencyRate).toFixed(2)}</b>
                  ) : (
                    <span className="d-flex flex-column">
                      <s>{currency} {(totalPriceInCart * currencyRate).toFixed(2)}</s>
                      <b className="text-danger">{currency} {(totalDiscountedPriceInCart * currencyRate).toFixed(2)}</b>
                    </span>
                  )
                }
              </h1>
            </div>

            {
              areThereAnyDiscountsInCart
              ? (
                <h4 className="text-success">
                  You will save <b>{currency}&nbsp;{amountSaved}</b> on this purchase
                </h4>
              ) : null
            }

            <button 
              type="button" 
              id="proceed-to-checkout-button"
              className="btn btn-primary mb-3 btn-lg proceed-to-checkout"
              disabled={isCheckoutButtonDisabled}
              onClick={e => goToCheckout(e)}
            >
              Proceed to checkout
            </button>

            {
              outOfStockMessage
              ? <h5>
                  <b className="text-danger">
                    <div>Sorry, some of the cart items became out of stock or the amount in stock is lesser than selected! 🙁</div> 
                    <div>Please, delete or choose the lesser amount of items in your cart to proceed to ckeckout!</div>
                  </b>
                </h5>
              : null
            }
          </>
        ) : (
          <div className="loader"></div>
        )
      }
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
  > .proceed-to-checkout {
    width: 290px;
  }
`
