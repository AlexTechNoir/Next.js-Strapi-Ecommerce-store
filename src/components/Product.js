import React from 'react'
import Link from 'next/link'
import { DivProduct } from '../styles'

export default function Product({ dataItem }) {
  const {
    id,
    title,
    imageWidth,
    imageHeight,
    price,
    hasDiscount,
    discount,
    isInCart,
    amountInCart,
    rating,
  } = dataItem

  return (
    <DivProduct>
      <Link href="/#">
        <a>
          <img 
            alt="Product"
            width={imageWidth}
            heigth={imageHeight}
            src={`/img/products/${id}/01.webp`}
          />
          <br />
          <h4>{title}</h4>
          <br />
          <h4>{price}</h4>
        </a>
      </Link>
    </DivProduct>
  )
}
