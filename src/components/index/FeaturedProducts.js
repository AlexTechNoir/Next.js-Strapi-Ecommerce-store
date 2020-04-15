import React, { useContext } from 'react'
import Context from '../../context'

import Product from '../Product'

export default function FeaturedProducts() {
  const { data } = useContext(Context)

  return (
    <React.Fragment>
      <h2>Best Offers</h2>
      <div>
        {
          data
            .filter( dataItem => dataItem.price === 250 )
            .map( dataItem => {
              return <Product key={dataItem.id} dataItem={dataItem} />
            })
        }
      </div>
    </React.Fragment>
  )
}
