import React from 'react'
import Product from '../Product'

export default function FeaturedProducts({ data }) {
  return (
    <React.Fragment>
      <h1>Best Offers</h1>
      <div>
        {
          data.map( dataItem => {
            return <Product key={dataItem.id} dataItem={dataItem} />
          })
        }
      </div>
    </React.Fragment>
  )
}
