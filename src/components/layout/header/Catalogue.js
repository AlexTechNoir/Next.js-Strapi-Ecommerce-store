import { useState } from 'react'
import styled from 'styled-components'

import Nav from './Nav'

export default function Catalogue() {
  const [ isNavVisible, setIsNavVisible ] = useState(false)

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible)
  }

  return (
    <CatalogueDiv>
      <button type="button" className="btn btn-light" onClick={toggleNav}>
        Catalogue
      </button>
      <Nav toggleNav={toggleNav} isNavVisible={isNavVisible} />
    </CatalogueDiv>
  )
}

const CatalogueDiv = styled.div`
  align-self: center;
  position: relative;
  > button {
    border: 1px solid lightgrey;
    color: #007bff;
    font-weight: bold;
  }
`
