import Head from 'next/head'
import styled from 'styled-components'

import Timer from '../../components/Timer'
import ProductListItem from '../../components/ProductListItem'

export async function getServerSideProps(ctx) {
  const category = ctx.params.category

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
          products(filters: { and: [{ category: { name: { eq: "${category}" }}}, { discount: { discountMultiplier: { lt: 1 }}}]}) {
            data {
              id
              attributes {
                title
                price
                available
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
        const err = new Error('Error in pages/sales/[category].js, getServerSideProps() function, .then statement, if (r.status >= 400) condition')
        err.data = r
        throw err
      }
      return r.json()
    })
    .catch(err => console.error('Error in pages/sales/[category].js, getServerSideProps() function, .catch statement, err object:', err))
    
  const categoryItems = data.data.products.data

  return {
    props: { category, categoryItems }
  }
}

export default function Sale({ category, categoryItems }) {
  return (
    <>
      <Head>
        <title>{category} Sale! - Alimazon</title>
        <meta
          name="description"
          content={`${category} on SALE right now!!!`}
        />
      </Head>

      <DivSales>
        <div className="banner-and-timer">
          <picture>
            <source data-srcset={`/img/carousel/${category}/01.webp`} type="image/webp" />
            <img src={`/img/carousel/${category}/01.jpg`} alt={`${category} Sale`} />
          </picture>
          <hr />
          <Timer />
        </div>
        <div className="category-products">
          {categoryItems.map(item => <ProductListItem key={item.id} item={item} />)}
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
  > .banner-and-timer {
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
  }
  > .category-products {
    display: grid;
    grid-template-columns: repeat(auto-fit, 290px);
    grid-row-gap: .5rem;
    grid-column-gap: .5rem;
    justify-content: center;	
    margin-top: 1em;
  }
`
