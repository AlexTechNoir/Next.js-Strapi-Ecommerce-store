import { useContext, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import CartContext from '../../../context/cartContext'
import styled from 'styled-components'
import { useState } from 'react'

export default function CartButton() {
  const { cartBadgeToggle } = useContext(CartContext)

  const [ itemsAmountInCart, setItemsAmountInCart ] = useState(0)

  const assignProductAmountInCart = () => {
    const cartList = JSON.parse(localStorage.cartList)
    const cartListLength = cartList.length

    setItemsAmountInCart(cartListLength)
  }

  useEffect(() => {
    if (localStorage.getItem('cartList') !== null) {
      assignProductAmountInCart()
    } else {
      setItemsAmountInCart(0)
    }   
  },[cartBadgeToggle])

  return (
    <Link href="/cart">
      <a aria-label="Shopping cart link">
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {
          itemsAmountInCart > 0
          ? <DivIconAmountInCart>
              {itemsAmountInCart}
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
