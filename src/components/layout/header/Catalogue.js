import React, { useState } from 'react'

import Nav from './Nav'

export default function Catalogue() {
  const [ isNavVisible, setIsNavVisible ] = useState(false)

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible)
  }

  return (
    <div>
      <button type="button" className="btn btn-light" onClick={toggleNav}>
        Catalogue
      </button>
      {
        isNavVisible
        ? <Nav />
        : null
      }
    </div>
  )
}


