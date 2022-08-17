import { useContext, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import CartContext from '../../../context/cartContext'
import styled from 'styled-components'
import { useState } from 'react'

export default function CartButton() {
  const { cartBadgeToggle } = useContext(CartContext)

  const [ itemsAmountInCartForBadge, setItemsAmountInCartForBadge ] = useState(0)

  const assignItemsAmount = () => {

    if (localStorage.getItem('cartList') !== null) {

      const cartList = JSON.parse(localStorage.cartList)
      const cartListLength = cartList.length
  
      setItemsAmountInCartForBadge(cartListLength)      
    } else {
      setItemsAmountInCartForBadge(0)
    }  
  }

  useEffect(() => {
    assignItemsAmount()
  },[cartBadgeToggle]) // triggers in: 1. components/productPage/AddToCart.js in addToCart() and cancelAdding()
  // 2. components/cart/CartList.js in clearCart()
  // 3. components/cart/cartList/CartListItem.js in deleteItem()
  // 4. components/checkout/PayPalCheckoutButton.js in onApprove()

  return (
    <Link href="/cart">
      <a aria-label="Shopping cart link">
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {
          itemsAmountInCartForBadge > 0
          ? <DivIconAmountInCart>
              {itemsAmountInCartForBadge}
            </DivIconAmountInCart>
          : null
        }
      </a>
    </Link>
  )
}

const DivIconAmountInCart = styled.div`
  position: absolute;
  border-radius: 50%;
  font-weight: bold;
  background: #dc3545;
  color: #f8f9fa;
  width: 21px;
  height: 21px;
  font-size: 0.8em;
  text-align: center;
  vertical-align: middle;
  top: 27px;
  right: 110px;
`
