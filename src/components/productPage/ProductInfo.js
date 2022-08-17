import { useContext } from 'react'
import styled from 'styled-components'
import CurrencyContext from '../../context/currencyContext'

export default function ProductInfo({ 
  attributes, 
  title, 
  company, 
  description, 
  price, 
  discountMultiplier, 
  discountPercent 
}) {

  const { isCurrencySet, currency, currencyRate } = useContext(CurrencyContext)

  return (
    <ProductInfoDiv>
      <h1>{title}</h1>
      <h2>Company: {company}</h2>
      <h2 className="price-info">
        Price: &nbsp;
        {
          isCurrencySet
          ? (
            <span className="price-wrapper">
              {
                attributes.discount.data === null
                ? (
                  <span className="d-flex no-wrap">
                    <span>{currency}</span>&nbsp;
                    <span>{(price * currencyRate).toFixed(2)}</span>
                  </span>
                ) : (
                  <span className="price-with-discount d-flex flex-column">
                    <h4 className="discount-text text-success">
                      {discountPercent} OFF!
                    </h4>
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
            </span>
          ) : (
            <div className="loader"></div>
          )
        }

      </h2>
      <br />
      <h3>Info: {description}</h3>
    </ProductInfoDiv>
  )
}

const ProductInfoDiv = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  margin-top: 0;
  align-self: start;  
  padding-left: 1rem;
  padding-right: 1rem;
  > .price-info > .price-wrapper > .price-with-discount {
    position: relative;
    > .discount-text {
      position: absolute;
      top: -12px;
      left: 80px;
      transform: rotate(14deg);
    }
  }

  @media only screen and (max-width: 850px) {
    margin-top: 5rem;
    align-self: auto;
  }
`
