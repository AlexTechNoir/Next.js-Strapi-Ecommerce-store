
import React from 'react'

export default function AddToCart({ dataItem }) {
  const { id, 
          hasDiscount, 
          isInCart, 
          amountInCart } = dataItem

  return (
    <>
      <h3 className="d-flex">
        Amount:
        <button className="btn btn-outline-dark border-right-0 rounded-0 ml-3"
                type="button" 
                value="-" 
                name="-"> - </button>
        <input  className="btn btn-outline-dark border-left-0 border-right-0 rounded-0"
                type="text" 
                value={0}
                size="1" 
                readOnly />
        <button className="btn btn-outline-dark border-left-0 rounded-0" 
                type="button" 
                value="+" 
                name="+"> + </button>
        <h6 className={isInCart ? "d-inline-flex bg-danger text-white mx-3 mb-0 p-1 rounded" 
                                : "d-inline-flex invisible"}>
          <span>In cart:</span> 
          <span>{amountInCart}</span>
        </h6>
      </h3>
      <div className="position-relative">
        <button type="button"
                className="btn btn-warning mr-2">Add to cart</button>
      </div>
    </>
  )
}