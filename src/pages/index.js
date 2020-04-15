import Head from 'next/head'
import dynamic from 'next/dynamic'
import { DivIndex } from '../styles'

import Layout from '../components/Layout'
import FeaturedProducts from '../components/index/FeaturedProducts'

const FeaturedCarousel = dynamic(
  () => import('../components/index/FeaturedCarousel'),
  { ssr: false }
)

export default function Index() {
  return (
    <React.Fragment>      
      <Head>
        <title>Alimazon - Home Page</title>
      </Head>

      <Layout>
        <DivIndex>
          <FeaturedCarousel />
          <FeaturedProducts />
        </DivIndex>
      </Layout>
    </React.Fragment>
  )
}
