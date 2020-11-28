import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Context from '../context'
import styled from 'styled-components'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

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
      <Image 
        alt="SearchItem"
        src={`/img/products/${id}/01.webp`}
        width={121}
        height={121}
        layout="fixed"
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

const DivSearchResult = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  border: 1px solid #dc3545;
  border-radius: 5px;
  background: #f8f9fa;
  margin: .5em;
  padding: 1em;
  > :first-child {
    grid-area: 1 / 1 / 2 / 2;
    margin-right: 1rem;
  }
  > :nth-child(2) {
    grid-area: 1 / 2 / 2 / 3;
    align-self: start;
    justify-self: start;
    display: flex;
    flex-direction: column;
    > a, a:hover, a:focus {
      color: #343a40;
      text-decoration: none;
    }
    > a:hover, a:focus {
      text-shadow: 2px 2px 20px;
    }
    > h6 {
      color: #007bff;
    }
    > span > span > :last-child {
      color: yellow;
      stroke: black;
      stroke-width: 25;
    }
  }
  > :nth-child(3) {
    grid-area: 2 / 2 / 3 / 3; 
    display: flex;
    justify-self: start;
    align-self: start; 
  }
  > :last-child {
    grid-area: 2 / 1 / 3 / 3;    
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 1em;
    > h3 {
      margin-bottom: 0;
    }
  }

  @media only screen and (min-width: 600px) {
    grid-template-rows: auto;
    grid-template-columns: auto 1fr 1fr 1fr;
    > :nth-child(2) {
      justify-self: start;
    }
    > :nth-child(3) {
      grid-area: 1 / 3 / 2 / 4; 
      justify-self: center;
    }
    > :last-child {
      grid-area: 1 / 4 / 2 / 5; 
      justify-self: end;
      align-self: start;
      margin-top: 0;
    }
  }
`
