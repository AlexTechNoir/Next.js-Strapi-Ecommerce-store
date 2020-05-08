import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import fetch from 'node-fetch'
import { DivProductPage } from '../../styles'

import Layout from '../../components/Layout'
import ProductInfo from '../../components/productPage/ProductInfo'
import AddToCart from '../../components/productPage/AddToCart'
import ToggleButtons from '../../components/productPage/ToggleButtons'
import Reviews from '../../components/productPage/Reviews'
import ProductSlider from '../../components/productPage/ProductSlider'
import Comments from '../../components/productPage/Comments'

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/data')
  const data = await res.json()
  const paths = data.map(dataItem => ({
    params: { id: dataItem.id.toString() }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch('http://localhost:3000/api/data')
  const data = await res.json()
  const dataItem = data[Number(params.id)]
  return { props: { dataItem }}
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

  function toggleTabs(e) {
    if (e.target.name === 'reviews') {
      setIsReviewsTabVisible(true)
    } else if (e.target.name === 'comments') {
      setIsReviewsTabVisible(false)
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>
          Buy {title} - Alimazon
        </title>
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
          <div>
            <ProductInfo dataItem={dataItem} />
            <AddToCart dataItem={dataItem} />
          </div>
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


