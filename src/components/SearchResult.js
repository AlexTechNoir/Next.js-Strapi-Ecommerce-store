  
import React, { useState } from 'react'
import Link from 'next/link'
import { DivSearchResult } from '../Styles'

export default function SearchResult({ result }) {
  const { id, 
          title, 
          category,
          price, 
          hasDiscount,
          discount,
          isInCart, 
          amountInCart, 
          rating } = result
  
  const [ inputValue, setInputValue ] = useState(0)
  const [ isInfoVisible, setIsInfoVisible] = useState(false)

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

  function counter(e) {
    if (e.target.name === "-" && inputValue > 0) {
      setIsInfoVisible(false)
      setInputValue(inputValue - 1)
    } else if (e.target.name === "-" && inputValue <= 0) {
      return null
    } else if (e.target.name === "+") {
      setIsInfoVisible(false)
      setInputValue(inputValue + 1)
    }
  }

  function showInfo(inputValue) {
    if (inputValue >= 1) {
      setIsInfoVisible(true)
      setTimeout(() => setIsInfoVisible(false), 3000)
    } else { return null }
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
        <div>
          <button
            className="btn btn-outline-dark border-right-0 rounded-0"
            type="button"
            name="-"
            onClick={counter}
          >
            {" "}-{" "}
          </button>
          <input
            className="btn btn-outline-dark border-left-0 border-right-0 rounded-0"
            type="text"
            value={inputValue}
            size="1"
            readOnly
          />
          <button
            className="btn btn-outline-dark border-left-0 rounded-0"
            type="button"
            name="+"
            onClick={counter}
          >
            {" "}+{" "}
          </button>
        </div>
        <button type="button" className="btn btn-warning" onClick={showInfo(inputValue)}>
          Add to cart
        </button>
        <div className={isInfoVisible ? "visible" : "invisible"}>
          +{inputValue} items added!
        </div>
      </div>
      <div>
        <h3>
          {price}
        </h3>
      </div>
    </DivSearchResult>
  )
}
