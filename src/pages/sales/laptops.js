import React, { useContext } from 'react'
import Head from 'next/head'
import { DivSales } from '../../Styles'
import Context from '../../context'

import Layout from '../../components/Layout'
import Timer from '../../components/Timer'
import Product from '../../components/Product'

export default function MobilePhonesDiscount() {
  const { data } = useContext(Context)

  return (
    <React.Fragment>
      <Head>
        <title>Laptops Sale! - Alimazon</title>
      </Head>

      <Layout>
        <DivSales>
          <div>
            <img src="/img/carousel/02.webp" alt="Laptops Sale" />
            <hr />
            <Timer />
          </div>
          <div>
            {
              data.filter(dataItem => dataItem.category === 'Laptops' && dataItem.hasDiscount === true)
                .map(dataItem => {
                  return <Product key={dataItem.id} dataItem={dataItem} />
                })
            }
          </div>
        </DivSales>
      </Layout>
    </React.Fragment>
  )
}
