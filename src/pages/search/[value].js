import { useRouter } from 'next/router'
import useSWR from 'swr'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const SearchResult = dynamic(() => import('../../components/SearchResult'))

const fetcher = url => fetch(url).then(res => res.json())

export default function SearchResults() {
  const router = useRouter()
  const { value } = router.query

  const { data, error, loading } = useSWR(`/api/search?value=${value}`, fetcher)

  return (
    <>
      <Head>
        <title>Search results for: "{value}" - Alimazon</title>
      </Head>

      <DivSearchResults>
        {
          loading || !data
          ? <div className="loader"></div>
          : error
          ? "Error."
          : data.data.products.data.map(result => <SearchResult key={result.id} result={result} />)
        }
      </DivSearchResults>
    </>
  )
}

const DivSearchResults = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
`
