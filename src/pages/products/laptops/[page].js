import React, { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import ReactPaginate from 'react-paginate'
import { DivProducts } from '../../../styles'
import Context from '../../../context'
import { laptops } from '../../../data'

import Layout from '../../../components/Layout'
import ProductListItem from '../../../components/ProductListItem'

const fetcher = url => {
  return fetch(url).then(res => res.json())
}

export async function getServerSideProps({ params }) {
  const data = await fetcher(`http://localhost:3000/api/data?category=laptops&page=${params.page}&limit=8`)
  return { props: { data, params }}
}

export default function mobilePhones(props) {
  const router = useRouter()
  const { page } = router.query

  const { itemsPerPage } = useContext(Context)

  const initialData = props.data
  const { data } = useSWR(
    `http://localhost:3000/api/data?category=laptops&page=${props.params.page}&limit=8`,
    fetcher,
    { initialData }
  )

  const paginate = e => {
    router.push({ pathname: `/products/laptops/${e.selected + 1}`})
  }

  return (
    <React.Fragment>
      <Head>
        <title>
          Laptops - Alimazon
        </title>
      </Head>

      <Layout>
        <DivProducts>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <Link href="/"><a className="breadcrumb-item"><li>Home</li></a></Link>
              <li className="breadcrumb-item active" aria-current="page">Laptops</li>
            </ol>
          </nav>
          <div>
            {
              data.map(dataItem => {
                return <ProductListItem key={dataItem.id} dataItem={dataItem} />
              })
            }
          </div>
          <ReactPaginate 
            forcePage={page - 1}
            pageCount={Math.ceil(laptops.length / itemsPerPage)}
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
      </Layout>
    </React.Fragment>
  )
}
