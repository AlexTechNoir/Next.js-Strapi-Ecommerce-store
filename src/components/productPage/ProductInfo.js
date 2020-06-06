import React, { useContext } from 'react'
import Context from '../../context'

export default function ProductInfo({ dataItem }) {
  const { 
    title, 
    company,
    description, 
    price,
    hasDiscount,
    discount,
    rating 
  } = dataItem

  const { fetchedRates, currency } = useContext(Context)

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
    <div>
      <h1>{title}</h1>
      <h2>Company: {company}</h2>
      <h5>Global rating: {rating}</h5>
      <h5>Your rating: 0</h5>
      <h2>
        Price: &nbsp;
        <span>
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
                  <span>{parseFloat(((price * currencyRate) * discount).toFixed(2))}</span>
                </span>
              </span>
          }
        </span>
      </h2>
      <br />
      <h3>Info: {description}</h3>
    </div>
  )
}
