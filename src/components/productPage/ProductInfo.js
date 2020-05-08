
import React from 'react'

export default function ProductInfo({ dataItem }) {
  const { title, 
          company,
          description, 
          price,
          hasDiscount,
          discount,
          rating } = dataItem

  return (
    <React.Fragment>
      <h1>{title}</h1>
      <h2>Company: {company}</h2>

      <h5>Global rating: {rating}</h5>
      <h5>Your rating: 0</h5>
      <h2>
        Price: &nbsp;
        <span>
          {price}
        </span>
      </h2>
      <br />
      <h3>Info: {description}</h3>
    </React.Fragment>
  )
}
