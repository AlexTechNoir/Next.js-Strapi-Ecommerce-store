import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Search() { 
  const router = useRouter()
  const [ searchValue, setSearchValue ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (location.pathname.includes('search')) {
      inputRef.current.value = location.pathname.substr(location.pathname.lastIndexOf('/') + 1)
    } else {
      inputRef.current.value = ''
    }
  }, [])

  const search = e => {
    e.preventDefault()
    if (searchValue !== '') {
      router.push(`/search/${searchValue.trim()}`)
    } else { return null }
  }

  return (
    <form id="formSearchBar" onSubmit={search}>
      <input type="search" name="search" ref={inputRef} onChange={e => setSearchValue(String(e.target.value))} />
      <button type="submit" value="submit" form="formSearchBar">
        <FontAwesomeIcon icon={faSearch} width="1em" />
      </button>
    </form>
  )
}
