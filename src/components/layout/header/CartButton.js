import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

export default function CartButton() {
  return (
    <Link href="/cart">
      <FontAwesomeIcon icon={faShoppingCart} width="1em" />
    </Link>
  )
}
