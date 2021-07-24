import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Rating from 'react-rating'
import CurrencyContext from '../context/currencyContext'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function ProductListItem({ dataItem }) {
  const {
    id,
    title,
    imageWidth,
    imageHeight,
    price,
    hasDiscount,
    discount
  } = dataItem

  const { fetchedRates, currency } = useContext(CurrencyContext)

  const [ isItemInCart, setIsItemInCart ] = useState(false)
  const [ quantity, setQuantity ] = useState(0)
  const [ rating, setRating ] = useState(0)

  useEffect(() => {
    const cartList = localStorage.getItem('cartList') !== null ? JSON.parse(localStorage.cartList) : []
    const item = cartList.find(cartListItem => cartListItem.id === id)
    if (item !== undefined) {
      setIsItemInCart(item.isInCart)
      setQuantity(item.amountInCart)
    }

    const ratings = localStorage.getItem('ratings') !== null ? JSON.parse(localStorage.ratings) : []
    const itemRating = ratings.find(i => i.id === id)
    if (itemRating !== undefined) {
      setRating(itemRating.rating)
    }
  }, [])

  let currencyRate = 1
  
  if (currency === '€') {
    currencyRate = fetchedRates.EUR
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
    <DivProductListItem >
      <Link href="/product-page/[id].js" as={`/product-page/${id}`}>
        <a>
          <Image 
            alt={title}
            src={`/img/products/${id}/01.webp`}
            width={imageWidth}
            height={imageHeight}
            layout="fixed"
          />
          <br />
          <div>{title}</div>
          <Rating 
            fractions={2}
            emptySymbol={<FontAwesomeIcon icon={faStar} width="1em" />}
            fullSymbol={<FontAwesomeIcon icon={faStarFull} width="1em" />}
            initialRating={rating}
            readonly={true}
          />
          <br />
          <div>
            <div>
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
            </div>
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

const DivProductListItem = styled.div`
  height: 427px;
  width: 290px;
  background: #f8f9fa;
  border-radius: 10px;
  &:hover {
    box-shadow: .1rem .1rem 1rem .1rem rgba(0,0,0,.3);
    text-decoration: none;
  }
  > a {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5em;
    color: #343a40;
    &:hover {
      text-decoration: none;
    }
    > :first-child {
      align-self: center;
    }
    > :nth-child(3) {
      font-size: 1.5rem;
    }
    > span > span > :last-child {
      color: yellow;
      stroke: black;
      stroke-width: 30;
    }
    > :last-child {
      display: flex;
      justify-content: space-between;
      > :first-child {
        font-size: 1.5rem;
      }
      > :nth-child(2) {
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
