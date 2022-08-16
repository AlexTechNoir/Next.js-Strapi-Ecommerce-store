import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

import ProductListItem from '../../../components/ProductListItem'

export async function getServerSideProps(ctx) {
  const categoryPath = ctx.params.category
  const categoryName = categoryPath.trim().replace('-', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
  const lowerCaseCategoryName = categoryPath.trim().toLowerCase().replace('-', ' ')
  const page = ctx.params.page

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
          products(filters: { category: { name: { eq: "${categoryName}" }}}, pagination: { page: ${page}, pageSize: 8 } ) {
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
            meta {
              pagination {
                total
              }
            }
          }
        }
      `
    })
  })
    .then(r => {
      if (r.status >= 400) {
        const err = new Error('Error in: pages/products/[category]/[page].js, server-side props, fetch, .then statement, if (r.status >= 400) condtion')
        err.data = r
        throw err
      }
      return r.json()
    })
    .catch(err => console.error(err))

  const categoryItems = data.data.products.data
  const totalItems = data.data.products.meta.pagination.total

  return { props: { categoryPath, categoryName, lowerCaseCategoryName, categoryItems, totalItems }}
}

export default function CategoryPage({ 
  categoryPath, 
  categoryName, 
  lowerCaseCategoryName, 
  categoryItems, 
  totalItems 
}) {  
  const router = useRouter()
  const { page } = router.query

  const paginate = e => router.push({ pathname: `/products/${categoryPath}/${e.selected + 1}`})

  return (
    <>
      <Head>
        <title>{categoryName} - Alimazon</title>
        <meta name="description" content={`The BEST ${lowerCaseCategoryName} in the world!!!`} />
      </Head>

      <DivProducts>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Link href="/"><a className="breadcrumb-item"><li>Home</li></a></Link>
            <li className="breadcrumb-item active" aria-current="page">{categoryName}</li>
          </ol>
        </nav>
        <div className="category-items">
          {categoryItems.map(item => <ProductListItem key={item.id} item={item} />)}
        </div>
        <ReactPaginate 
          forcePage={page - 1}
          pageCount={Math.ceil(totalItems / 8)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={3}
          onPageChange={paginate}
          previousLabel={'«'}
          nextLabel={'»'}
          breakLabel={'...'}
          activeClassName={'active'}
          disableInitialCallback={true}
        />
      </DivProducts>
    </>
  )
}

const DivProducts = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  > .category-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, 290px);
    grid-row-gap: .5rem;
    grid-column-gap: .5rem;
    justify-content: center;
  }
  > :last-child {
    align-self: center;    
    display: flex;
    list-style: none;
    height: 2.5em;
    border: 1px solid black;
    border-radius: 5px;
    width: fit-content;
    align-items: center;
    padding: 0;
    margin-top: 2.5em;
    > li > a {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    > .active > a {
      font-weight: bold;
      text-decoration: underline;
      pointer-events: none;
    }
    > .disabled > a {
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
    }
  }
`
