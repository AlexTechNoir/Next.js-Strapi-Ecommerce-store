import Head from 'next/head'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

import FeaturedProducts from '../components/index/FeaturedProducts'

const FeaturedCarousel = dynamic(
  () => import('../components/index/FeaturedCarousel'),
  { ssr: false }
)

export async function getServerSideProps() {
  const data = await fetch(`${
    process.env.NODE_ENV === "production"
      ? process.env.PROD_CMS_URL
      : process.env.DEV_CMS_URL
    }/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          products(filters: { price: { eq: 250 }}) {
            data {
              id
              attributes {
                title
                price
                image {
                  data {
                    attributes {
                      name
                      alternativeText
                      url
                    }
                  }
                }
                discount {
                  data {
                    attributes {
                      discountPercent
                      discountMultiplier
                    }
                  }
                }
              }
            }
          }
        }
      `
    })
  })
    .then(r => {
      if (r.status >= 400) {
        const err = new Error('Error')
        err.data = r
        throw err
      }
      return r.json()
    })
    .catch(err => console.error(err))
  
  return { props: { data } }
}

export default function Index({ data }) {
  const items = data.data.products.data

  const [ windowWidth, setWindowWidth ] = useState(null)

  const changeWindowWidth = () => setWindowWidth(window.screen.width)

  useEffect(() => {
    window.addEventListener("resize", changeWindowWidth)
    changeWindowWidth()

    return () => window.removeEventListener("resize", changeWindowWidth)    
  }, [])

  return (
    <>
      <Head>
        <title>Alimazon - Home Page</title>
        <meta name="description" content="Alimazon - the BEST online store in the entire world!!!" />
      </Head>

      <DivIndex windowWidth={windowWidth <= 960 ? windowWidth : null}>
        <div role="banner" className="carousel">
          <FeaturedCarousel />
        </div>
        <FeaturedProducts items={items} />
      </DivIndex>
    </>
  )
}

const DivIndex = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  > .carousel {
    max-width: 960px;
    height: ${props => props.windowWidth !== null ? (props.windowWidth / 1.92) + 'px' : '500px'};
    align-self: center;
    margin-bottom: 2em; 
    > .carousel-root {
      &:hover {
        cursor: pointer;
      }
      &:active {
        cursor: grabbing;
      }
    }
  }
  > .best-offers-heading {
    margin-left: 1rem;
  }
  > .best-offers-products {
    display: grid;
    grid-template-columns: repeat(auto-fit, 290px);
    grid-row-gap: .5rem;
    grid-column-gap: .5rem;
    justify-content: center;	
  }
`
