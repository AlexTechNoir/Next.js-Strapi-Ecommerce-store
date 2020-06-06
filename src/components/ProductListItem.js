import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Context from '../context'
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
    rating,
  } = dataItem

  const { fetchedRates, currency } = useContext(Context)

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

  let currencyRate = 1
  
  if (currency === '$') {
    currencyRate = fetchedRates.USD
  } else if (currency === '₽') {
    currencyRate = fetchedRates.RUB
  } else if (currency === 'Ch¥') {
    currencyRate = fetchedRates.CNY
  } else if (currency === 'Jp¥') {
    currencyRate = fetchedRates.JPY
  } else if (currency === '₩') {
    currencyRate = fetchedRates.KRW
  } else if (currency === '₹') {
    currencyRate = fetchedRates.INR
  }

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
            <h4>
              {
                !hasDiscount
                ? <span className="d-flex no-wrap">
                    <span>{currency}</span>&nbsp;
                    <span>{(parseFloat(price * currencyRate)).toFixed(2)}</span>
                  </span>
                : <span className="d-flex flex-column">
                    <s className="d-flex no-wrap">
                      <span>{currency}</span>&nbsp;
                      <span>{(parseFloat(price * currencyRate)).toFixed(2)}</span>
                    </s>
                    <span className="d-flex no-wrap text-danger">
                      <span>{currency}</span>&nbsp;
                      <span>{(parseFloat((price * currencyRate) * discount)).toFixed(2)}</span>
                    </span>
                  </span>
              }
            </h4>
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
