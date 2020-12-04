import Head from 'next/head'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

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
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_HOST
        : process.env.NEXT_PUBLIC_DEV_HOST
    }/api/data?category=best_offers`
  )
  return { props: { data } }
}

export default function Index(props) {
  const initialData = props.data
  const { data } = useSWR(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_HOST
        : process.env.NEXT_PUBLIC_DEV_HOST
    }/api/data?category=best_offers`,
    fetcher,
    { initialData }
  )

  const [ windowWidth, setWindowWidth ] = useState(null)

  const changeWindowWidth = () => setWindowWidth(window.screen.width)

  useEffect(() => {
    window.addEventListener("resize", changeWindowWidth)
    changeWindowWidth()

    return () => window.removeEventListener("resize", changeWindowWidth)    
  }, [])

  return (
    <>
      <Head>
        <title>Alimazon - Home Page</title>
        <meta name="description" content="Alimazon - the BEST online store in the entire world!!!" />
      </Head>

      <Layout>
        <DivIndex windowWidth={windowWidth <= 960 ? windowWidth : null}>
          <div>
            <FeaturedCarousel />
          </div>
          <FeaturedProducts data={data} />
        </DivIndex>
      </Layout>
    </>
  )
}

const DivIndex = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  > :first-child {
    max-width: 960px;
    height: ${props => props.windowWidth !== null ? (props.windowWidth / 1.92) + 'px' : '500px'};
    align-self: center;
    margin-bottom: 2em; 
    > .carousel-root {        
      &:hover {
        cursor: pointer;
      }
      &:active {
        cursor: grabbing;
      }
    }
  }
  > :nth-child(2) {
    margin-left: 1rem;
  }
  > :last-child {
    display: grid;
    grid-template-columns: repeat(auto-fit, 290px);
    grid-row-gap: .5rem;
    grid-column-gap: .5rem;
    justify-content: center;	
  }
`
