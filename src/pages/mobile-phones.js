import React, { useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { DivProducts } from '../styles'
import Context from '../context'
import { mobile_phones } from '../data'
import useSWR from 'swr'
import ReactPaginate from 'react-paginate'

import Layout from '../components/Layout'
import Product from '../components/Product'

function fetcher(url) {
  return fetch(url).then(r => r.json())
}

export default function mobilePhones() {
  const { currentPage, itemsPerPage, paginate, resetPage } = useContext(Context)
  const { data, error, loading } = useSWR(`/api/mobile_phones/${currentPage}/${itemsPerPage}`, fetcher)

  useEffect(() => {
    return () => {
      resetPage()
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Mobile Phones</title>
      </Head>

      <Layout>
        <DivProducts>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <Link href="/"><a className="breadcrumb-item"><li>Home</li></a></Link>
              <li className="breadcrumb-item active" aria-current="page">Mobile Phones</li>
            </ol>
          </nav>
          <div>
            {
              loading || !data
              ? "Loading..."
              : error
              ? "Error."
              : data.map(dataItem => {
                  return <Product key={dataItem.id} dataItem={dataItem} />
                })
            }
          </div>
          <ReactPaginate 
            forcePage={currentPage - 1}
            pageCount={Math.ceil(mobile_phones.length / itemsPerPage)}
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
