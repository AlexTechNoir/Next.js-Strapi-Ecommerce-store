
import React from 'react'
import Link from 'next/link'
import { DivCartListItem } from '../../styles'

export default function CartListItem({ cartListItem }) {
  const { id,
          title, 
          company,
          amountInCart,
          price,
          hasDiscount,
          totalPrice } = cartListItem

  return (
    <DivCartListItem className="rounded bg-light border border-danger mb-3 p-3">
      <img
        src={`/img/products/${id}/01.webp`}
        alt={title}
        height="100"
        width="100"
      />
      <div>
        <Link href="/product-page/[id].js" as={`/product-page/${id}`}>
          <a>
            <h5 className="text-dark">{title}</h5>
          </a>
        </Link>
        <h6 className="p-1">
          Company: {company}
        </h6>
      </div>
      <h6 className="d-flex no-wrap align-items-start mb-0">
        <button
          className="btn btn-outline-dark border-right-0 rounded-0"
          name="-"
        >
          {" "}-{" "}
        </button>
        <input
          className="btn btn-outline-dark border-left-0 border-right-0 rounded-0"
          type="text"
          value={amountInCart}
          size="1"
          readOnly
        />
        <button
          className="btn btn-outline-dark border-left-0 rounded-0"
          name="+"
        >
          {" "}+{" "}
        </button>
      </h6>
      <h5 className="d-inline-flex no-wrap">
        <span>Total price:</span>
        <span className="d-flex no-wrap ml-1">
          {totalPrice}
        </span>
      </h5>
      <button
        type="button"
        className="close text-danger d-inline-block"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </DivCartListItem>
  )
}