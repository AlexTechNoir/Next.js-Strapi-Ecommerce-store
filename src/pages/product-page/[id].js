import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

import ProductInfo from '../../components/productPage/ProductInfo'
import AddToCart from '../../components/productPage/AddToCart'
import ToggleButtons from '../../components/productPage/ToggleButtons'
import Reviews from '../../components/productPage/Reviews'
import ProductSlider from '../../components/productPage/ProductSlider'
const Comments = dynamic(() => import('../../components/productPage/Comments'))

export async function getServerSideProps(context) {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_HOST
        : process.env.NEXT_PUBLIC_DEV_HOST
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
    <>
      <Head>
        <title>Buy {title} - Alimazon</title>
        <meta name="description" content={`${title} - the LOWEST price, the BEST quality!!!`} />
      </Head>

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
    </>
  )
}

const DivProductPage = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  > :first-child {
    align-self: flex-start;
  }
  > .carousel-root {
    margin-bottom: 2em;
    max-width: 400px;
    max-height: 400px;
    > div > .thumbs-wrapper > ul {
      padding: 0;
      display: flex;
      justify-content: center;
      > :nth-child(3) {
        margin-right: 0;
      }
    }
  }
  > .product-info {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  > :nth-child(4) {
    display: flex;
    align-content: flex-start;
    align-items: flex-start;
    align-self: flex-start;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1em;
    > :first-child > div {
      display: flex;
      flex-direction: column;
      > h6 > button {
        margin-right: 1em;
      }
    }
    > :last-child {
      background: #dc3545;
      color: white;
      margin: 0 1.5em 0 1.5em;
      padding: .2em .5em .2em .5em;
      border-radius: 5px;
    }
  }
  > :nth-child(5) {
    align-self: stretch;
    > button {
      width: 50%;
      margin-top: 2.5em;
      padding: .5em 2em .5em 2em;
      box-shadow: none;
      border-radius: 0;
    }
  }
  > :nth-child(6) {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #fff; 
    > :first-child {
      background: #f8f9fa;      
      > .wrapper {
        width: 100%;
        .colorPickerPopup {
          top: 23px;
        }
        .linkPopup {
          left: -42px;
          top: 23px;
          height: 233px;
        }
        .emojiPopup {
          top: 23px;
          left: -148px;
        }
        .embeddedPopup {
          top: 23px;
          left: -111px;
        }
        .imagePopup {
          top: 23px;
          left: -186px;
        }
        > .editor {        
          width: 100%;
          padding: 0 1em 0 1em;
          border-bottom: 1px solid #F1F1F1;
        }
      }
    }
    > .post-button {
      align-self: flex-start;
      margin: 1em 0 0 1em;
    }
    > .note {
      align-self: center;
      margin-top: 1em;
    }
    > .review {
      padding: 1em;
      margin-bottom: 1em;
      > :first-child {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: .5em;
        > :first-child {
          display: flex;        
          align-items: flex-end; 
          > img {
            margin-right: .5em;
          }
          > :nth-child(2) {
            margin-right: .5em;         
          }
          > :last-child {
            cursor: pointer;
            &:hover {
              opacity: 0.6;
            } 
          }
        } 
      }
      > .wrapper {
        border: 1px solid black;
        border-radius: 5px;
        width: 100%;
      }
      > :last-child {
        display: flex;
      }
    }
  }

  @media only screen and (min-width: 850px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto 1fr auto auto auto;
    > :first-child {
      grid-area: 1 / 1 / 2 / 3;
    }
    > :nth-child(2) {
      max-width: 400px;
      max-height: 400px;
      grid-area: 2 / 1 / 3 / 2;
      justify-self: center;
    }
    > :nth-child(3) {
      grid-area: 2 / 2 / 3 / 3;
    }
    > :nth-child(4) {
      grid-area: 3 / 2 / 4 / 3;
    }
    > :nth-child(5) {
      grid-area: 4 / 1 / 5 / 3;
    }
    > :nth-child(6) {
      grid-area: 5 / 1 / 6 / 3;
    }
  }
`
