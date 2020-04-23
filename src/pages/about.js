import Head from 'next/head'
import Link from 'next/link'
import { DivAbout } from '../styles'

import Layout from '../components/Layout'

export default function About() {
  return (
    <React.Fragment>
      <Head>
        <title>About Page</title>
      </Head>

      <Layout>
        <DivAbout>
          <div>About</div>
          <Link href="/">
            <a>Go To Index</a>
          </Link>
        </DivAbout>
      </Layout>
    </React.Fragment>
  )
}
