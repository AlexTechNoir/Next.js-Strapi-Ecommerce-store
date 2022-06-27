import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import CurrencyContext from '../context/currencyContext'
import styled from 'styled-components'

export default function ProductListItem({ item }) {
  const id = item.id
  const attributes = item.attributes
  
  const title = attributes.title
  const price = attributes.price
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

  useEffect(() => {
    if (localStorage.getItem('cartList') !== null) {
      const cartList = JSON.parse(localStorage.cartList)
      const item = cartList.find(cartListItem => cartListItem.id === id)

      if (item !== undefined) {
        setIsItemInCart(true)
        setQuantity(item.selectedAmount)
      }
    }
  }, [])

  return (
    <DivProductListItem>
      <Link href="/product-page/[id].js" as={`/product-page/${id}`}>
        <a className="link">
          <img alt={title} src={imgUrl} width={200} height={200} className="image" />
          <br />
          <div className="title">{title}</div>
          <br /> 
          {
            isCurrencySet
            ? (
              <div className="price-and-in-cart-wrapper">
                {
                  attributes.discount.data === null
                  ? (
                    <div className="price">
                      <span className="d-flex no-wrap">
                        <span>{currency}</span>&nbsp;
                        <span>{(parseFloat(price * currencyRate)).toFixed(2)}</span>
                      </span>
                    </div>
                  ) : (
                    <div className="price d-flex">
                      <h5 className="discount-text text-success">
                        {discountPercent} OFF!
                      </h5>
                      <span className="d-flex flex-column">
                        <s className="d-flex no-wrap">
                          <span>{currency}</span>&nbsp;
                          <span>{(parseFloat(price * currencyRate)).toFixed(2)}</span>
                        </s>
                        <span className="d-flex no-wrap text-danger">
                          <span>{currency}</span>&nbsp;
                          <span>{(parseFloat((price * currencyRate) * discountMultiplier)).toFixed(2)}</span>
                        </span>
                      </span>
                    </div>
                  )
                }
                {
                  isItemInCart
                  ? <div className="in-cart">In cart: {quantity}</div>
                  : null
                }
              </div>
            ) : (
              <div className="loader"></div>
            )
          }
        </a>
      </Link>
    </DivProductListItem>
  )
}



const DivProductListItem = styled.div`
  height: 427px;
  width: 290px;
  background: #f8f9fa;
  border-radius: 10px;
  &:hover {
    box-shadow: .1rem .1rem 1rem .1rem rgba(0,0,0,.3);
    text-decoration: none;
  }
  > .link {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5em;
    color: #343a40;
    &:hover {
      text-decoration: none;
    }
    > .image {
      align-self: center;
    }
    > .title {
      font-size: 1.5rem;
    }
    > .price-and-in-cart-wrapper {
      display: flex;
      justify-content: space-between;
      > .price {
        font-size: 1.5rem;
        position: relative;
        > .discount-text {
          position: absolute;
          top: -12px;
          right: -35px;
          transform: rotate(24deg);
        }
      }
      > .in-cart {
        align-self: flex-start;
        background: #dc3545;
        color: white;
        margin: 0 1.5em 0 1.5em;
        padding: .3em .5em .2em .5em;
        border-radius: 5px;
      }
    }
  }
`
