import React, { useContext } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { DivIconAmountInCart } from '../../../styles'
import Context from '../../../context'

export default function CartButton() {
  const { cartList } = useContext(Context)

  return (
    <Link href="/cart">
      <a aria-label="Shopping cart link">
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {
          cartList.length > 0
          ? <DivIconAmountInCart>
              {cartList.length}
            </DivIconAmountInCart>
          : null
        }
      </a>
    </Link>
  )
}
