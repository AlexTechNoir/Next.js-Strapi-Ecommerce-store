import React, { useState, useEffect } from 'react'
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

  const [ isItemInCart, setIsItemInCart ] = useState(false)
  const [ quantity, setQuantity ] = useState(0)

  useEffect(() => {
    const cartList = JSON.parse(localStorage.cartList)
    const item = cartList.find(cartListItem => cartListItem.id === id)
    if (item !== undefined) {
      setIsItemInCart(item.isInCart)
      setQuantity(item.amountInCart)
    }
  }, [])

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
          <div>
            <h4>{price}</h4>
            {
              isItemInCart
              ? <div>In cart: {quantity}</div>
              : null
            }
          </div>
        </a>
      </Link>
    </DivProductListItem>
  )
}
