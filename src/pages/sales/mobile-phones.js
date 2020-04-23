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
        <title>Mobile Phones Sale! - Alimazon</title>
      </Head>

      <Layout>
        <DivSales>
          <div>
            <img src="/img/carousel/01.webp" alt="Mobile Phones Sale" />
            <hr />
            <Timer />
          </div>
          <div>
            {
              data.filter(dataItem => dataItem.category === 'Mobile Phones' && dataItem.hasDiscount === true)
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
