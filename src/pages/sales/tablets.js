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
        <title>Tablets Sale! - Alimazon</title>
      </Head>

      <Layout>
        <DivSales>
          <div>
            <img src="/img/carousel/03.webp" alt="Tablets Sale" />
            <hr />
            <Timer />
          </div>
          <div>
            {
              data.filter(dataItem => dataItem.category === 'Tablets' && dataItem.hasDiscount === true)
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
