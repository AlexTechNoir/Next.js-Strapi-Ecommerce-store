import { useContext } from 'react'
import CurrencyContext from '../../context/currencyContext'

export default function ProductInfo({ dataItem }) {

  const { 
    title, 
    company,
    description, 
    price,
    hasDiscount,
    discount
  } = dataItem

  const { fetchedRates, currency } = useContext(CurrencyContext)

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
    <div className="product-info">
      <h1>{title}</h1>
      <h2>Company: {company}</h2>
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
                  <span>{(parseFloat((price * currencyRate) * discount)).toFixed(2)}</span>
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
