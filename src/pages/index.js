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
  const data = await fetcher(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_HOST
        : process.env.NEXT_PUBLIC_PROD_HOST
    }/api/data?category=best_offers`
  )
  return { props: { data } }
}

export default function Index(props) {
  const initialData = props.data
  const { data } = useSWR(
    `${
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_HOST
        : process.env.NEXT_PUBLIC_PROD_HOST
    }/api/data?category=best_offers`,
    fetcher,
    { initialData }
  )

  return (
    <React.Fragment>
      <Head>
        <title>Alimazon - Home Page</title>
        <meta name="description" content="Alimazon - the BEST online store in the entire world!!!" />
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
