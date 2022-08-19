import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

export default function Search() { 
  const router = useRouter()
  const [ searchValue, setSearchValue ] = useState('')
  const inputRef = useRef(null)

  const handleValueInput = () => {

    if (location.pathname.includes('search')) {
      inputRef.current.value = location.pathname.substr(location.pathname.lastIndexOf('/') + 1)
    } else {
      inputRef.current.value = ''
    }    
  }

  const search = e => {
    e.preventDefault()
    if (searchValue !== '') {
      router.push(`/search/${searchValue.trim()}`)
    } else { return null }
  }

  useEffect(() => {
    handleValueInput()
  }, [router.asPath]) // triggers on route change

  return (
    <SearchForm id="formSearchBar" onSubmit={search}>
      <input 
        id="search-bar"
        aria-label="Search graph" 
        type="search" 
        name="search" 
        ref={inputRef} 
        onChange={e => setSearchValue(String(e.target.value))}
      />
      <button type="submit" value="submit" form="formSearchBar" aria-label="Search button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </SearchForm>
  )
}

const SearchForm = styled.form`
  grid-area: 1 / 3 / 2 / 4;    
  align-self: center;
  justify-self: stretch;
  margin: 1em;
  display: flex;
  > input {
    border: 1px solid black;
    border-right: 0;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 0 .3em 0 .3em;
    width: 100%;
  }
  > button {
    height: auto;
    width: auto;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid #ffc107;
    background: #ffc107;
    color: #dc3545;
    cursor: pointer;
  }

  @media only screen and (max-width: 686px) {
    grid-area: 2 / 1 / 3 / 5;
  }
`
