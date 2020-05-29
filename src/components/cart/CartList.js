import React from 'react'
import { DivCartList } from '../../styles'

import CartListItem from './CartListItem'

export default function CartList({ cartList, clearCart }) {
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
          Subtotal price:
          <span>                
            0
          </span>
        </h2>
        <h2>
          Tax:
          <span>
            0
          </span>
        </h2>
        <h1>
          Total price:
          <span>  
            0
          </span>
        </h1>
      </div>
    </DivCartList>
  )
}
