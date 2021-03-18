import styled from 'styled-components'

import Lists from './footer/Lists'
import Buttons from './footer/Buttons'
import Social from './footer/Social'

export default function Footer({ showCookieBanner }) {
  return (
    <StyledFooter>
      <Lists showCookieBanner={e => showCookieBanner(e)} />
      <Buttons />
      <Social />
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  grid-area: 3 / 1 / 4 / 4;
  background: #343a40;
  margin-top: 2em;
  padding: 1em 0 1em 0;
  color: white;
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: auto;
  grid-row-gap: 1rem;
  > ul > li {
    background: transparent;
    padding: 0;
    > a {
      color: #ffc107;
      &:hover {
        color: #ba8b00;
      }
    }
  }
  > :nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    > div {
      color: #f8f9fa;
      margin-bottom: 1em;
      padding: .5em;
      border-radius: 5px;
      > select {
        color: #f8f9fa;
        margin-left: .5em;
      }
    }
    > :first-child {
      background: #17a2b8;
      > select {
        background: #17a2b8;
        border: 1px solid #17a2b8;
      }
    }
    > :last-child {
      background: #007bff;
      > select {
        background: #007bff;
        border: 1px solid #007bff;
      }
    }
  }
  > :last-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #f8f9fa;
    margin: 0 1em 0 1em;
    > form > label {
      display: flex;
      > :first-child {
        padding: 0 .2em 0 .2em;
      }
    }
    > :nth-child(2) {
      margin-bottom: 1em;
      > a {
        color: #f8f9fa;
        margin-right: 1em;
        &:hover {
          color: #dddddd;
        }
      }
    }
  }

  @media only screen and (min-width: 540px) {
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(2, 1fr);
    rid-column-gap: 1rem;
    > :first-child {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }
    > :nth-child(2) {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
    }
    > :nth-child(3) {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }
    > :last-child {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
    }
  }

  @media only screen and (min-width: 1067px) {
    grid-template-rows: auto;
    grid-template-columns: 1fr repeat(4, auto) 1fr;
    grid-column-gap: 1rem;
    > :first-child {
      grid-column: 2 / 3;
    }
    > :nth-child(2) {
      grid-column: 3 / 4;
    }
    > :nth-child(3) {
      grid-row: 1 / 3;
      grid-column: 4 / 5;
    }
    > :last-child {
      grid-row: 1 / 3;
      grid-column: 5 / 6;
    }
  }
`
