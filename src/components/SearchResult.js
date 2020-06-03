  
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { DivSearchResult } from '../Styles'

export default function SearchResult({ result }) {
  const {
    id,
    title,
    category,
    price,
    hasDiscount,
    discount,
    isInCart,
    amountInCart,
    rating
  } = result

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

  let productCategory

  if (category === "Mobile Phones") {
    productCategory = (
      <Link href="/products/mobile-phones/[page]" as="/products/mobile-phones/1">
        <a>Mobile Phones</a>
      </Link>
    )
  } else if (category === "Laptops") {
    productCategory = (
      <Link href="/products/laptops/[page]" as="/products/laptops/1">
        <a>Laptops</a>
      </Link>
    )
  } else if (category === "Tablets") {
    productCategory = (
      <Link href="/products/tablets/[page]" as="/products/tablets/1">
        <a>Tablets</a>
      </Link>
    )
  }

  return (
    <DivSearchResult>
      <img
        src={`/img/products/${id}/01.webp`}
        alt="SearchItem"
        width="121"
        heigth="121"
      />
      <div>
        <Link href="/product-page/[id].js" as={`/product-page/${id}`}>
          <a>
            <h4>{title}</h4>
          </a>
        </Link>
        <h6>{productCategory}</h6>
      </div>
      <div>
        <h3>{price}</h3>
        {
          isItemInCart
          ? <div>In cart: {quantity}</div>
          : null
        }
      </div>
    </DivSearchResult>
  )
}
