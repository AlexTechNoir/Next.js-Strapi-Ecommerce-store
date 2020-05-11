import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import useSWR from 'swr'
import { DivSearchResults } from '../../styles'

import Layout from '../../components/Layout'
import SearchResult from '../../components/SearchResult'

const fetcher = url => {
  return fetch(url).then(res => res.json())
}

export default function SearchResults() {
  const router = useRouter()
  const { value } = router.query

  const { data, error, loading } = useSWR(`http://localhost:3000/api/data?category=search&value=${value}`, fetcher)

  return (
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Layout>
        <DivSearchResults>
          {
            loading || !data
            ? "Loading..."
            : error
            ? "Error."
            : data.map(result => {
                return <SearchResult key={result.id} result={result} />
            })
          }
        </DivSearchResults>
      </Layout>
    </React.Fragment>
  )
}
