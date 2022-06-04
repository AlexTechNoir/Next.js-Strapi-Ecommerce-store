import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import CurrencyContext from '../context/currencyContext'
import styled from 'styled-components'
import Image from 'next/image'

export default function ProductListItem({ dataItem }) {
  const {
    id,
    title,
    price
  } = dataItem

  const { fetchedRates, currency } = useContext(CurrencyContext)

  const [ isItemInCart, setIsItemInCart ] = useState(false)
  const [ quantity, setQuantity ] = useState(0)

  useEffect(() => {
    const cartList = localStorage.getItem('cartList') !== null ? JSON.parse(localStorage.cartList) : []
    const item = cartList.find(cartListItem => cartListItem.id === id)
    if (item !== undefined) {
      setIsItemInCart(item.isInCart)
      setQuantity(item.amountInCart)
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
    <DivProductListItem>
      <Link href="/product-page/[id].js" as={`/product-page/${id}`}>
        <a>
          <Image 
            alt={title}
            src={`/img/products/${id}/01.webp`}
            width={200}
            height={200}
            layout="fixed"
          />
          <br />
          <div>{title}</div>
          <br />
          <div>
            <div>
              <span className="d-flex no-wrap">
                <span>{currency}</span>&nbsp;
                <span>{(parseFloat(price * currencyRate)).toFixed(2)}</span>
              </span>
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
