import React from 'react'
import ProductListItem from '../ProductListItem'

export default function FeaturedProducts({ data }) {
  return (
    <React.Fragment>
      <h1>Best Offers</h1>
      <div>
        {
          data.map( dataItem => {
            return <ProductListItem key={dataItem.id} dataItem={dataItem} />
          })
        }
      </div>
    </React.Fragment>
  )
}
