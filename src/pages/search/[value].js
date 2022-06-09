import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
const SearchResult = dynamic(() => import('../../components/SearchResult'))

const fetcher = url => fetch(url).then(res => res.json())

export default function SearchResults() {
  const router = useRouter()
  const { value } = router.query

  const { data, error, loading } = useSWR(`/api/data?category=search&value=${value}`, fetcher)

  return (      
    <DivSearchResults>
      {
        loading || !data
        ? "Loading..."
        : error
        ? "Error."
        : data.data.products.data.map(result => <SearchResult key={result.id} result={result} />)
      }
    </DivSearchResults>
  )
}

const DivSearchResults = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
`
