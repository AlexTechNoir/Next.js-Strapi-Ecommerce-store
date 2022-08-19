import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Head from 'next/head'

export async function getServerSideProps(ctx) {
  const query = ctx.query

  return {
    props: { query }
  }
}

export default function thankYou({ query }) {
  const router = useRouter()

  useEffect(() => {
    if (!query.id) {
      router.push('/')
    }
  },[])

  if (!query.id) {
    return (
      <ThankYou>
        <div>Redirecting...</div>
      </ThankYou>
    )
  }

  return (
    <>
      <Head>
        <title>Thank you for purchase! - Alimazon</title>
      </Head>

      <ThankYou>
        <h1>Thank you for purchase! 🙏</h1>
        <h2>Your order id is: <b>{query.id}</b></h2>
        <h2>We have sent you an email with the information about your order 📧</h2>
      </ThankYou>
    </>
  )
}

const ThankYou = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px 0 16px;
  > h1, > h2 {
    margin-bottom: 32px;
    text-align: center;
  }

  @media only screen and (max-width: 428px) {
    > h1 {
      font-size: 1.75rem;
    }
    > h2 {
      font-size: 1.5rem;
    }
  }
`
