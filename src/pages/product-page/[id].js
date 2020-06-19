import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { DivProductPage } from '../../styles'

import Layout from '../../components/Layout'
import ProductInfo from '../../components/productPage/ProductInfo'
import AddToCart from '../../components/productPage/AddToCart'
import ToggleButtons from '../../components/productPage/ToggleButtons'
import Reviews from '../../components/productPage/Reviews'
import ProductSlider from '../../components/productPage/ProductSlider'
import Comments from '../../components/productPage/Comments'

export async function getServerSideProps(context) {
  const res = await fetch(    
    `${
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_HOST
        : process.env.NEXT_PUBLIC_PROD_HOST
    }/api/data`
  )
  const data = await res.json()
  const dataItem = data[Number(context.params.id)]

  return {
    props: { dataItem }
  }
}

export default function ProductPage({ dataItem }) {
  const { title, category } = dataItem

  const [ isReviewsTabVisible, setIsReviewsTabVisible ] = useState(true)

  let productCategory

  if (category === "Mobile Phones") {
    productCategory = (
      <Link href="/products/mobile-phones/[page]" as="/products/mobile-phones/1">
        <a>Mobile Phones</a>
      </Link>
    )
  } else if (category === "Laptops") {
    productCategory = (
      <Link href="/products/laptops/[page]" as="/products/laptops/1">
        <a>Laptops</a>
      </Link>
    )
  } else if (category === "Tablets") {
    productCategory = (
      <Link href="/products/tablets/[page]" as="/products/tablets/1">
        <a>Tablets</a>
      </Link>
    )
  }

  const toggleTabs = e => {
    if (e.target.name === 'reviews') {
      setIsReviewsTabVisible(true)
    } else if (e.target.name === 'comments') {
      setIsReviewsTabVisible(false)
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Buy {title} - Alimazon</title>
        <meta name="description" content={`${title} - the LOWEST price, the BEST quality!!!`} />
      </Head>

      <Layout>
        <DivProductPage>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/"><a>Home</a></Link></li>
              <li className="breadcrumb-item">{productCategory}</li>
              <li className="breadcrumb-item active" aria-current="page">{title}</li>
            </ol>
          </nav>
          <ProductSlider dataItem={dataItem} />
          <ProductInfo dataItem={dataItem} />
          <AddToCart dataItem={dataItem} />
          <ToggleButtons toggleTabs={toggleTabs} isReviewsTabVisible={isReviewsTabVisible} />
          {
            isReviewsTabVisible
            ? <Reviews dataItem={dataItem} />
            : <Comments />
          }
        </DivProductPage>
      </Layout>
    </React.Fragment>
  )
}
