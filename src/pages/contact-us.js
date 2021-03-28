import Head from 'next/head'
import styled from 'styled-components'
import Context from '../context'
import { GA_TRACKING_ID } from '../../lib/gtag'
import { useContext } from 'react'

import Layout from '../components/Layout'

export default function ContactUs() {
  const { areCookiesAccepted } = useContext(Context)
  
  return (
    <>
      <Head>
        <title>Contact Us! - Alimazon</title>
        <meta name="description" content="Write to us! Not sure whether we'll read tho." />
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
        <DivContactForm>
          <h1>Contact Us!</h1>
          <form>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Your e-mail:</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" required />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Your message:</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
            </div>
            <input className="btn btn-primary" type="submit" value="Submit"></input>
          </form>
        </DivContactForm>
      </Layout>
    </>
  )
}

const DivContactForm = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  border-radius: 5px;
  padding: 2.5em;
`
