import Head from 'next/head'
import Link from 'next/link'
import { DivIndex } from '../styles'

import Layout from '../components/Layout'

export default function Index() {
  return (
    <React.Fragment>      
      <Head>
        <title>Index Page</title>
      </Head>

      <Layout>
        <DivIndex>
          <div>Index</div>
          <Link href="/about">
            <a>Go To About</a>
          </Link>
        </DivIndex>
      </Layout>
    </React.Fragment>
  )
}
