import React from 'react'

import CartListItem from './CartListItem'

export default function CartList({ cartList }) {
  return (
    <React.Fragment>
      <div className="d-flex flex-column justify-content-center mb-3">
        { 
          !cartList
          ? <div>Loading...</div>
          : cartList.map(cartListItem => {
            return <CartListItem key={cartListItem.id} cartListItem={cartListItem} />
          })
        }
      </div>
      <button type="button" className="btn btn-danger mb-5">Clear cart</button>
      <div className="d-flex flex-column">
        <h2 className="d-flex no-wrap">
          Subtotal price:
          <span className="d-flex no-wrap pl-2">                
            0
          </span>
        </h2>
        <h2 className="d-flex no-wrap">
          Tax:
          <span className="d-flex no-wrap pl-2">
            0
          </span>
        </h2>
        <h1 className="d-flex no-wrap">
          Total price:
          <span className="d-flex no-wrap pl-2">  
            0
          </span>
        </h1>
      </div>
     </React.Fragment>
  )
}
