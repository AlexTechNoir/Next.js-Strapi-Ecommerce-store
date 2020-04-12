import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Search() {
  return (
    <form id="formSearchBar">
      <input type="search" name="search" />
      <button type="submit" value="submit" form="formSearchBar">
        <FontAwesomeIcon icon={faSearch} width="1em" />
      </button>
    </form>
  )
}
