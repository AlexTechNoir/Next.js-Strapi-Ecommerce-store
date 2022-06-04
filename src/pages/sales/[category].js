import Head from 'next/head'
import styled from 'styled-components'
import { data } from '../../data'

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
  return (
    <>
      <Head>
        <title>{params.category} Sale! - Alimazon</title>
        <meta
          name="description"
          content={`${params.category} on SALE right now!!!`}
        />
      </Head>

      <DivSales>
        <div>
          <picture>
            <source data-srcset={`/img/carousel/${params.category}/01.webp`} type="image/webp" />
            <img src={`/img/carousel/${params.category}/01.jpg`} alt={`${params.category} Sale`} />
          </picture>
          <hr />
          <Timer />
        </div>
        <div>
          {
            data
              .filter(dataItem => dataItem.category === params.category)
              .map(dataItem => {
                return <ProductListItem key={dataItem.id} dataItem={dataItem} />                  
              })
          }
        </div>
      </DivSales>
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
