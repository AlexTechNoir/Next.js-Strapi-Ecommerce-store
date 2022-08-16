import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

import ProductSlider from '../../components/productPage/ProductSlider'
import ProductInfo from '../../components/productPage/ProductInfo'
import AddToCart from '../../components/productPage/AddToCart'
import RelatedProducts from '../../components/productPage/RelatedProducts'
import Reviews from '../../components/productPage/Reviews'

export async function getServerSideProps(ctx) {
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
          product(id: ${ctx.params.id}) {
            data {
              id
              attributes {
                title
                company
                description
                price
                available
                image {
                  data {
                    id
                    attributes {
                      name
                      alternativeText
                      url
                      formats
                    }
                  }
                }
                category {
                  data {
                    attributes {
                      name
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
                relatedProducts {
                  products {
                    data {
                      id
                      attributes {
                        title
                        image {
                          data {
                            attributes {
                              name
                              url
                              alternativeText
                              formats
                            }
                          }
                        }
                      }
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
  
  const dataItem = data.data.product.data

  const reviewsData = await fetch(`${
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
          reviews(filters: { productId: { eq: "${ctx.params.id}" }}) {
            data {
              id
              attributes {
                name
                reviewText
                createdAt
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
    
  const reviewList = reviewsData.data.reviews.data

  return {
    props: { dataItem, reviewList }
  }
}

export default function ProductPage({ dataItem, reviewList }) {  
  const id = dataItem.id
  const attributes = dataItem.attributes

  const title = attributes.title
  const company = attributes.company
  const description = attributes.description
  const price = attributes.price
  const available = attributes.available
  const category = attributes.category.data.attributes.name
  const categoryPath = category.trim().toLowerCase().replace(' ', '-')
  const images = attributes.image.data

  let discountAttributes
  let discountPercent
  let discountMultiplier

  if (attributes.discount.data !== null) {
    discountAttributes = attributes.discount.data.attributes
    discountPercent = discountAttributes.discountPercent
    discountMultiplier = discountAttributes.discountMultiplier
  }

  let relatedProducts

  if (attributes.relatedProducts !== null) {
    relatedProducts = attributes.relatedProducts.products.data
  }

  return (
    <>
      <Head>
        <title>Buy {title} - Alimazon</title>
        <meta name="description" content={`${title} - the LOWEST price, the BEST quality!!!`} />
      </Head>

      <DivProductPage>
        <nav aria-label="breadcrumb" className="nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/"><a>Home</a></Link></li>
            <li className="breadcrumb-item">
              <Link href="/products/[category]/[page]" as={`/products/${categoryPath}/1`}>
                <a>{category}</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{title}</li>
          </ol>
        </nav>
        <ProductSlider images={images} />
        <ProductInfo 
          attributes={attributes}
          title={title} 
          company={company} 
          description={description} 
          price={price} 
          discountMultiplier={discountMultiplier} 
          discountPercent={discountPercent}
        />
        <AddToCart id={id} available={available} />
        <Reviews id={id} reviewList={reviewList} />
        {
          attributes.relatedProducts !== null
          ? (
            <RelatedProducts relatedProducts={relatedProducts} />
          ) : null
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
  > .nav {
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

  @media only screen and (min-width: 850px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto 1fr auto auto auto;
    > .nav {
      grid-area: 1 / 1 / 2 / 3;
    }
    > .carousel-root {
      max-width: 400px;
      max-height: 400px;
      grid-area: 2 / 1 / 3 / 2;
      justify-self: center;
    }
  }
`
