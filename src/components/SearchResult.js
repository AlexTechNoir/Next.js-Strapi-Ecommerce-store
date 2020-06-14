import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Context from '../context'
import { DivSearchResult } from '../styles'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'

export default function SearchResult({ result }) {
  const {
    id,
    title,
    category,
    price,
    hasDiscount,
    discount
  } = result

  const { fetchedRates, currency } = useContext(Context)

  const [ isItemInCart, setIsItemInCart ] = useState(false)
  const [ quantity, setQuantity ] = useState(0)
  const [ rating, setRating ] = useState(0)

  useEffect(() => {
    const cartList = JSON.parse(localStorage.cartList)
    const item = cartList.find(cartListItem => cartListItem.id === id)
    if (item !== undefined) {
      setIsItemInCart(item.isInCart)
      setQuantity(item.amountInCart)
    }

    const ratings = JSON.parse(localStorage.ratings)
    const itemRating = ratings.find(i => i.id === id)
    if (itemRating !== undefined) {
      setRating(itemRating.rating)
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
        <Rating 
          fractions={2}
          emptySymbol={<FontAwesomeIcon icon={faStar} width="1em" />}
          fullSymbol={<FontAwesomeIcon icon={faStarFull} width="1em" />}
          initialRating={rating}
          readonly={true}
        />
      </div>
      <div className={isItemInCart ? "bg-danger text-white p-1 rounded" : null}>
        <span>In cart:</span>&nbsp;
        <span>
          {
            isItemInCart
            ? quantity
            : 0
          }
        </span>
      </div>
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
      </div>
    </DivSearchResult>
  )
}
