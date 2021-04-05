import Head from 'next/head'
import styled from 'styled-components'
import { data } from '../../data'
import Context from '../../context'
import { GA_TRACKING_ID } from '../../../lib/gtag'
import { useContext } from 'react'

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
  return { props: { params, data } }
}

export default function Sale({ params, data }) {
  const { areCookiesAccepted } = useContext(Context)
  
  return (
    <>
      <Head>
        <title>{params.category} Sale! - Alimazon</title>
        <meta
          name="description"
          content={`${params.category} on SALE right now!!!`}
        />
        <script dangerouslySetInnerHTML={{
          __html: `
            window['ga-disable-${GA_TRACKING_ID}'] = ${!areCookiesAccepted}
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }} />
      </Head>

      <Layout>
        <DivSales>
          <div>
            <picture>
              <source data-srcSet={`/img/carousel/${params.category}/01.webp`} type="image/webp" />
              <img src={`/img/carousel/${params.category}/01.jpg`} alt={`${params.category} Sale`} />
            </picture>
            <hr />
            <Timer />
          </div>
          <div>
            {
              data
                .filter(dataItem =>
                  dataItem.category === params.category && dataItem.hasDiscount === true
                )
                .map(dataItem => {
                  return <ProductListItem key={dataItem.id} dataItem={dataItem} />                  
                })
            }
          </div>
        </DivSales>
      </Layout>
    </>
  )
}

const DivSales = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  justify-self: center;
  display: flex;
  flex-direction: column;    
  width: 100%;
  max-width: 1200px;
  > :first-child {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 100%;
    max-width: 960px;
    > picture > img {
      width: 100%;
      max-width: 960px;
      height: 100%;
    }
    > :last-child {
      margin: auto;
      > :first-child {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  > :last-child {
    display: grid;
    grid-template-columns: repeat(auto-fit, 290px);
    grid-row-gap: .5rem;
    grid-column-gap: .5rem;
    justify-content: center;	
    margin-top: 1em;
  }
`
