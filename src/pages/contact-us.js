import React from 'react'
import Head from 'next/head'
import { DivContactForm } from '../styles'

import Layout from '../components/Layout'

export default function ContactUs() {
  return (
    <React.Fragment>
      <Head>
        <title>Contact Us! - Alimazon</title>
        <meta name="description" content="Write to us! Not sure whether we'll read tho." />
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
    </React.Fragment>
  )
}