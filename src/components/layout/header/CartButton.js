import { useContext } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Context from '../../../context'
import styled from 'styled-components'

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
