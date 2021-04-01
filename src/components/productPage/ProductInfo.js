import { useState, useEffect, useContext } from 'react'
import Context from '../../context'
import Rating from 'react-rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'

export default function ProductInfo({ dataItem }) {
  useEffect(() => {
    const ratings = JSON.parse(localStorage.ratings)
    const itemRating = ratings.find(i => i.id === id)
    if (itemRating !== undefined) {
      setRating(itemRating.rating)
    }
  })

  const { 
    id,
    title, 
    company,
    description, 
    price,
    hasDiscount,
    discount
  } = dataItem

  const { fetchedRates, currency, refreshRatings } = useContext(Context)
  const [ rating, setRating ] = useState(0)

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

  const rate = value => {
    setRating(value)    

    const ratings = JSON.parse(localStorage.ratings)
    const itemRating = ratings.find(i => i.id === id)
    if (itemRating === undefined) {
      ratings.push({ id: id, rating: value })
      localStorage.setItem('ratings', JSON.stringify(ratings))
    } else {
      itemRating.rating = value
      localStorage.setItem('ratings', JSON.stringify(ratings))
    }

    refreshRatings()
  }

  return (
    <div>
      <h1>{title}</h1>
      <h2>Company: {company}</h2>
      <Rating 
        fractions={2}
        emptySymbol={<FontAwesomeIcon icon={faStar} width="1em" size="2x" />}
        fullSymbol={<FontAwesomeIcon icon={faStarFull} width="1em" size="2x" />}
        initialRating={rating}
        onClick={value => rate(value)}
      />
      <h5>Your rating: {rating}</h5>
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
