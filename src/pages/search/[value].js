import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Context from '../../context'
import { GA_TRACKING_ID } from '../../../lib/gtag'
import { useContext } from 'react'

import Layout from '../../components/Layout'
const SearchResult = dynamic(() => import('../../components/SearchResult'))

const fetcher = url => {
  return fetch(url).then(res => res.json())
}

export default function SearchResults() {
  const { areCookiesAccepted } = useContext(Context)
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
    <>
      <Head>
        <meta name="robots" content="noindex" />
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
    </>
  )
}

const DivSearchResults = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
`
