import React from 'react'
import Head from 'next/head'
import { DivSales } from '../../styles'

import Layout from '../../components/Layout'
import Timer from '../../components/Timer'
import ProductListItem from '../../components/ProductListItem'

export async function getStaticPaths() {
  return {
    paths: [
      { params : { category: 'Mobile Phones' } },
      { params : { category: 'Laptops' } },
      { params : { category: 'Tablets' } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch('http://localhost:3000/api/data')
  const data = await res.json()
  const filteredData = data.filter(dataItem => 
    dataItem.category === params.category && dataItem.hasDiscount === true
  )

  return { props: { params, filteredData } }
}

export default function Sale({ params, filteredData }) {
  return (
    <React.Fragment>
      <Head>
        <title>{params.category} Sale! - Alimazon</title>
        <meta name="description" content={`SALE on ${params.category} right now!!!`} />
      </Head>

      <Layout>
        <DivSales>
          <div>
            <img src={`/img/carousel/${params.category}/01.webp`} alt={`${params.category} Sale`} />
            <hr />
            <Timer />
          </div>
          <div>
            {
              data.map(dataItem => {
                return <ProductListItem key={dataItem.id} dataItem={dataItem} />
              })
            }
          </div>
        </DivSales>
      </Layout>
    </React.Fragment>
  )
}
