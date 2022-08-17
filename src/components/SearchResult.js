import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import CurrencyContext from '../context/currencyContext'
import styled from 'styled-components'

export default function SearchResult({ result }) {
  const id = result.id
  const attributes = result.attributes

  const title = attributes.title
  const price = attributes.price
  const category = attributes.category.data.attributes.name
  const categoryName = category.trim().replace('-', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
  const imgsArr = attributes.image.data
  const img = imgsArr.filter(i => i.attributes.name === "01.jpg")
  const imgUrl = img[0].attributes.url

  let discountAttributes
  let discountPercent
  let discountMultiplier

  if (attributes.discount.data !== null) {
    discountAttributes = attributes.discount.data.attributes
    discountPercent = discountAttributes.discountPercent
    discountMultiplier = discountAttributes.discountMultiplier
  }

  const { isCurrencySet, currency, currencyRate } = useContext(CurrencyContext)

  const [ isItemInCart, setIsItemInCart ] = useState(false)
  const [ quantity, setQuantity ] = useState(0)

  const setItemAmountIncart = () => {
    
    if (localStorage.getItem('cartList') !== null) {
      const cartList = JSON.parse(localStorage.cartList)
      const item = cartList.find(cartListItem => cartListItem.id === id)

      if (item !== undefined) {
        setIsItemInCart(true)
        setQuantity(item.selectedAmount)
      }
    }
  }

  useEffect(() => {
    setItemAmountIncart()
  }, [])

  return (
    <DivSearchResult>
      <img src={imgUrl} alt="SearchItem" width={121} height={121} className="image" />
      <div className="title-and-category-wrapper">
        <Link href={`/product-page/${id}`}>
          <a className="title-link">
            <h4>{title}</h4>
          </a>
        </Link>
        <h6 className="category-link-wrapper">
          <Link href={`/products/${category}/1`}>
            <a>{categoryName}</a>
          </Link>
        </h6>
      </div>
      <div className={`in-cart ${isItemInCart ? 'bg-danger text-white p-1 rounded' : null}`}>
        <span>In cart:</span>&nbsp;
        <span>{isItemInCart ? quantity : 0}</span>
      </div>
      {
        isCurrencySet
        ? (
          <div className="price-wrapper">
            <h4>
              {
                attributes.discount.data === null
                ? (
                  <span className="d-flex no-wrap">
                    <span>{currency}</span>&nbsp;
                    <span>{(price * currencyRate).toFixed(2)}</span>
                  </span>
                ) : (
                  <span className="d-flex flex-column">
                    <h5 className="discount-text text-success">
                      {discountPercent}&nbsp;OFF!
                    </h5>
                    <s className="d-flex no-wrap">
                      <span>{currency}</span>&nbsp;
                      <span>{(price * currencyRate).toFixed(2)}</span>
                    </s>
                    <span className="d-flex no-wrap text-danger">
                      <span>{currency}</span>&nbsp;
                      <span>{((price * currencyRate) * discountMultiplier).toFixed(2)}</span>
                    </span>
                  </span>
                )
              }
            </h4>
          </div>
        ) : (
          <div className="loader"></div>
        )
      }
    </DivSearchResult>
  )
}

const DivSearchResult = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto 1fr 1fr 1fr;
  border: 1px solid #dc3545;
  border-radius: 5px;
  background: #f8f9fa;
  margin: .5em;
  padding: 1em;
  position: relative;
  > .image {
    grid-area: 1 / 1 / 2 / 2;
    margin-right: 1rem;
  }
  > .title-and-category-wrapper {
    grid-area: 1 / 2 / 2 / 3;
    align-self: start;
    justify-self: start;
    display: flex;
    flex-direction: column;
    > .title-link, .title-link:hover, .title-link:focus {
      color: #343a40;
      text-decoration: none;
    }
    > .title-link:hover, .title-link:focus {
      text-shadow: 2px 2px 20px;
    }
    > .category-link-wrapper {
      color: #007bff;
    }
  }
  > .in-cart {
    grid-area: 1 / 3 / 2 / 4; 
    justify-self: center;    
    display: flex;    
    align-self: start; 
  }
  > .price-wrapper {
    grid-area: 1 / 4 / 2 / 5; 
    justify-self: end;
    align-self: start;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 0;       
    > h4 > span {
      position: relative;
      > .discount-text {
        position: absolute;
        top: -6px;
        right: 71px;
        transform: rotate(340deg);
      }
    } 
  }
  > .loader {
    justify-self: end;    
  }

  @media only screen and (max-width: 600px) {
    grid-template-rows: auto auto;
    grid-template-columns: auto auto;
    > .in-cart {
      grid-area: 2 / 2 / 3 / 3; 
      justify-self: start;
    }
    > .price-wrapper {
      grid-area: 2 / 1 / 3 / 3;   
      justify-self: auto;
      align-self: auto;
      margin-top: 1em; 
      > h4 > span > .discount-text {
        top: -9px;
        right: -50px;
        transform: rotate(20deg);
      }
    }
    > .loader {
      justify-self: start;
    }
  }
`
