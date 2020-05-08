import React from 'react'
import Link from 'next/link'
import { DivProductListItem } from '../styles'

export default function ProductListItem({ dataItem }) {
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
    <DivProductListItem>
      <Link href="/product-page/[id].js" as={`/product-page/${id}`}>
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
    </DivProductListItem>
  )
}
