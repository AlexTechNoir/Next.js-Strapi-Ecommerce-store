import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import styled from 'styled-components'

import Layout from '../../components/Layout'
import SearchResult from '../../components/SearchResult'

const fetcher = url => {
  return fetch(url).then(res => res.json())
}

export default function SearchResults() {
  const router = useRouter()
  const { value } = router.query

  const { data, error, loading } = useSWR(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_HOST
        : process.env.NEXT_PUBLIC_DEV_HOST
    }/api/data?category=search&value=${value}`,
    fetcher
  )

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

const DivSearchResults = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
`
