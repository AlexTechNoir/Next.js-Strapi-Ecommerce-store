import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Context from '../../../context'

export default function CartListItem({ cartListItem }) {
  const {
    id,
    title,
    company,
    amountInCart,
    price,
    hasDiscount,
    discount,
    inStock,
    totalPrice,
  } = cartListItem
  
  const { fetchedRates, currency, refreshCart, evaluateTotalPrice } = useContext(Context)

  const [ currentTotalPrice, setCurrentTotalPrice ] = useState(totalPrice)

  let options = []

  for (let i = 1; i <= inStock; i++) {
    options.push(<option value={`${i}`}>{i}</option>)
  }

  useEffect(() => {
    const select = document.getElementById(`itemsOf${id}`)
    select.options[amountInCart - 1].setAttribute('selected', true)
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

  const editAmount = async (id, price) => {
    const selectedAmount = document.getElementById(`itemsOf${id}`).value
    const updTotalPrice = price * selectedAmount

    fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_PROD_HOST
          : process.env.NEXT_PUBLIC_DEV_HOST
      }/api/cart/${id}?type=editInCart`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
          amountInCart: selectedAmount,
          totalPrice: updTotalPrice
        })
      }
    )
      .then(r => {
        if (r.status >= 400) {
          return r.json().then(errResData => {
            const err = new Error("Error.")
            err.data = errResData
            throw err
          })
        }
        return r.json()
      })
      .then(r => {
        const storageCartList = JSON.parse(localStorage.cartList)
        const changedCartList = storageCartList.map(
          obj => r.find(o => o.id === obj.id) || obj
        )
        setCurrentTotalPrice(r[0].totalPrice)
        localStorage.setItem("cartList", JSON.stringify(changedCartList))

        refreshCart()
        evaluateTotalPrice()
      })
  }

  const deleteItem = id => {
    fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_PROD_HOST
          : process.env.NEXT_PUBLIC_DEV_HOST
      }/api/cart/${id}?type=delete`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      }
    )
      .then(r => {
        if (r.status >= 400) {
          return r.json().then(errResData => {
            const err = new Error("Error.")
            err.data = errResData
            throw err
          })
        }
        return r.json()
      })
      .then(r => {
        const storageCartList = JSON.parse(localStorage.cartList)
        const changedCartList = storageCartList.filter(
          obj => obj.id !== r[0].id
        )
        localStorage.setItem("cartList", JSON.stringify(changedCartList))
        refreshCart()

        evaluateTotalPrice()
      })
  }

  return (
    <DivCartListItem>
      <img
        src={`/img/products/${id}/01.webp`}
        alt={title}
        height="100"
        width="100"
      />
      <div>
        <Link href="/product-page/[id].js" as={`/product-page/${id}`}>
          <a>
            <h5>{title}</h5>
          </a>
        </Link>
        <h6>
          Company: {company}
        </h6>
      </div>
      <div>
        <label htmlFor={`itemsOf${id}`}>
          Quantity:&nbsp;
          <select id={`itemsOf${id}`} onChange={() => editAmount(id, price)}>
            {options}
          </select>
        </label>
      </div>
      <h5>
        <span>Total price:</span>
        {
          !hasDiscount
          ? <span className="d-flex no-wrap">
              <span className="align-self-end">{currency}</span>&nbsp;
              <span className="align-self-end">{(parseFloat(currentTotalPrice * currencyRate)).toFixed(2)}</span>
            </span>
          : <span className="d-flex flex-column">
              <s className="d-flex no-wrap">
                <span>{currency}</span>&nbsp;
                <span>{(parseFloat(currentTotalPrice * currencyRate)).toFixed(2)}</span>
              </s>
              <span className="d-flex no-wrap text-danger">
                <span>{currency}</span>&nbsp;
                <span>{(parseFloat((currentTotalPrice * currencyRate) * discount)).toFixed(2)}</span>
              </span>
            </span>
        }
      </h5>
      <button
        type="button"
        className="close text-danger d-inline-block"
        aria-label="Close"
        onClick={() => deleteItem(id)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </DivCartListItem>
  )
}

const DivCartListItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 2fr 1fr auto;
  grid-template-rows: auto auto auto;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  border-radius: 5px;
  background: #f8f9fa;
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #dc3545;
  > :first-child {
    grid-area: 1 / 1 / 2 / 2;
  }
  > :nth-child(2) {
    grid-area: 1 / 2 / 2 / 5;
    display: flex;
    flex-direction: column;
    width: 100%;
    > a, a:hover, a:focus {
      text-decoration: none;
      width: 100%;
      > h5 {
        color: #343a40;
      }
    }
    > a:hover, a:focus {
      text-shadow: 2px 2px 20px;
    }
  }
  > :nth-child(3) {
    grid-area: 2 / 1 / 3 / 5;
    display: flex;
    align-items: flex-start;
    margin-bottom: 0;
  }
  > :nth-child(4) {
    grid-area: 3 / 1 / 4 / 5;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    > :nth-child(2) {
      margin-left: .2em;
    }
  }
  > :last-child {
    grid-area: 1 / 5 / 2 / 6;
    justify-self: end;
  }

  @media only screen and (min-width: 500px) {
    grid-template-columns: auto 1fr 1fr 1fr auto;
    grid-template-rows: auto;
    > :nth-child(2) {
      grid-area: 1 / 2 / 2 / 3;
    }
    > :nth-child(3) {
      grid-area: 1 / 3 / 2 / 4;
    }
    > :nth-child(4) {
      grid-area: 1 / 4 / 2 / 5;
      justify-self: end;
    }
  }
`
