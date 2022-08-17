import styled from 'styled-components'

import Lists from './footer/Lists'
import SelectButtons from './footer/SelectButtons'
import Social from './footer/Social'

export default function Footer({ showCookieBanner }) {
  return (
    <StyledFooter>
      <Lists showCookieBanner={e => showCookieBanner(e)} />
      <SelectButtons />
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
  grid-template-rows: auto;
  grid-template-columns: 1fr repeat(4, auto) 1fr;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  > .first-and-second-lists > li {
    background: transparent;
    padding: 0;
    > a {
      color: #ffc107;
      &:hover {
        color: #ba8b00;
      }
    }
  }
  > .first-list {
    grid-area: 1 / 2 / 2 / 3;
  }
  > .second-list {
    grid-area: 1 / 3 / 2 / 4;
  }
  > .select-buttons {
    grid-area: 1 / 4 / 2 / 5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    > .currency-and-country-select-buttons {
      color: #f8f9fa;
      margin-bottom: 1em;
      padding: .5em;
      border-radius: 5px;
      > select {
        color: #f8f9fa;
        margin-left: .5em;
      }
    }
    > .currency-select-buttons {
      background: #17a2b8;
      > select {
        background: #17a2b8;
        border: 1px solid #17a2b8;
      }
    }
    > .country-select-buttons {
      background: #007bff;
      > select {
        background: #007bff;
        border: 1px solid #007bff;
      }
    }
  }
  > .social {
    grid-area: 1 / 5 / 2 / 6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #f8f9fa;
    margin: 0 1em 0 1em;
    > .social-media-links {
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

  @media only screen and (max-width: 1067px) {
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
    > .first-list {
      grid-area: 1 / 1 / 2 / 2;
    }
    > .second-list {
      grid-area: 1 / 2 / 2 / 3;
    }
    > .select-buttons {
      grid-area: 2 / 1 / 3 / 2;
    }
    > .social {
      grid-area: 2 / 2 / 3 / 3;
      > .social-media-links {
        margin-top: 16px;
      }
    }
  }

  @media only screen and (max-width: 540px) {
    grid-template-rows: repeat(4, auto);
    grid-template-columns: auto;
    grid-column-gap: 0;    
    > .first-list {
      grid-area: 1 / 1 / 2 / 2;
    }
    > .second-list {
      grid-area: 2 / 1 / 3 / 2;
    }
    > .select-buttons {
      grid-area: 3 / 1 / 4 / 2;
    }
    > .social {
      grid-area: 4 / 1 / 5 / 2;
    }
  }
`
