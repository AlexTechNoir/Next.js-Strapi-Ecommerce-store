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

  const { fetchedRates, currency } = useContext(CurrencyContext)

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
    <DivSearchResult>
      <img src={imgUrl} alt="SearchItem" width={121} height={121} />
      <div>
        <Link href="/product-page/[id].js" as={`/product-page/${id}`}>
          <a>
            <h4>{title}</h4>
          </a>
        </Link>
        <h6>
          <Link href="/products/[category]/[page]" as={`/products/${category}/1`}>
            <a>{categoryName}</a>
          </Link>
        </h6>
      </div>
      <div className={isItemInCart ? "bg-danger text-white p-1 rounded" : null}>
        <span>In cart:</span>&nbsp;
        <span>{isItemInCart ? quantity : 0}</span>
      </div>
      <div>
        <h4>
          <span className="d-flex no-wrap">
            <span>{currency}</span>&nbsp;
            <span>{(parseFloat(price * currencyRate)).toFixed(2)}</span>
          </span>
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
