import Head from 'next/head'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { DivIndex } from '../styles'

import Layout from '../components/Layout'
import FeaturedProducts from '../components/index/FeaturedProducts'

const FeaturedCarousel = dynamic(
  () => import('../components/index/FeaturedCarousel'),
  { ssr: false }
)

const fetcher = url => {
  return fetch(url).then(res => res.json())
}

export async function getServerSideProps() {
  const data = await fetcher('http://localhost:3000/api/data?category=best_offers')
  return { props: { data } }
}

export default function Index(props) {
  const initialData = props.data
  const { data } = useSWR('http://localhost:3000/api/data?category=best_offers', fetcher, { initialData })

  return (
    <React.Fragment>
      <Head>
        <title>Alimazon - Home Page</title>
      </Head>

      <Layout>
        <DivIndex>
          <FeaturedCarousel />
          <FeaturedProducts data={data} />
        </DivIndex>
      </Layout>
    </React.Fragment>
  )
}
