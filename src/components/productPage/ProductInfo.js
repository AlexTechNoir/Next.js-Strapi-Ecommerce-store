import { useContext } from 'react'
import styled from 'styled-components'
import CurrencyContext from '../../context/currencyContext'

export default function ProductInfo({ title, company, description, price }) {
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
    <ProductInfoDiv>
      <h1>{title}</h1>
      <h2>Company: {company}</h2>
      <h2>
        Price: &nbsp;
        <span>
          <span className="d-flex no-wrap">
            <span>{currency}</span>&nbsp;
            <span>{(parseFloat(price * currencyRate)).toFixed(2)}</span>
          </span>
        </span>
      </h2>
      <br />
      <h3>Info: {description}</h3>
    </ProductInfoDiv>
  )
}

const ProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;

  @media only screen and (min-width: 850px) {
    grid-area: 2 / 2 / 3 / 3;
    margin-top: 0;
    align-self: start;
  }
`
