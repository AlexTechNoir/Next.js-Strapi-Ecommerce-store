import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle` 
  * {
    box-sizing: border-box;
    font-family: 'Roboto Condensed', sans-serif;
  }

  html, body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    height: 100%;
    scroll-behavior: smooth;
    background-color: #e9e9e9; 
  }

  #__next {
    height: 100%;
  }
`

//Layout.js
export const DivGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 100% auto;
  height: 100%;
  position: relative;
`

//Header.js
export const StyledHeader = styled.header`
  grid-area: 1 / 1 / 2 / 4;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto 1fr auto;
  background: #f8f9fa;
  margin-bottom: 2em;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  > :first-child {
    cursor: pointer;
  }
  > :nth-child(2) {
    align-self: center;
    position: relative;
    > button {
      border: 1px solid lightgrey;
      color: #007bff;
      font-weight: bold;
    }
  }
  > :nth-child(3) {
    grid-area: 2 / 1 / 3 / 5;
    align-self: center;
    justify-self: stretch;
    margin: 1em;
    display: flex;
    > :first-child {
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
    }
  }
  > :last-child {
    grid-area: 1 / 4 / 2 / 5;
    display: flex;
    margin-right: 1em;
    > * {
      color: #007bff;
      cursor: pointer;      
      margin: 0 .2em 0 .2em;
    }
    > button {
      display: flex;
      padding: 0;
      font-size: .8em; 
    }
  }
`

//header/Nav.js
export const StyledNav = styled.nav`
  min-width: 255px;
  max-width: 255px;
  position: absolute;
  top: 104px;
  left: -60px;
  z-index: 3;
  > ul {
    display: flex;
    flex-direction: column;
    background: #f8f9fa;
    > li {
      border-left: 2px solid red;
      border-bottom: 1px solid #acacac;
      border-right: 1px solid #acacac;
      font-size: 0.8125rem;
    }
  }
`

//index.js
export const DivIndex = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  > .carousel-root {
    align-self: center;
    margin-bottom: 2em;  
    max-width: 960px;  
    max-height: 500px;
    &:hover {
      cursor: pointer;
    }
    &:active {
      cursor: grabbing;
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

//mobile-phones.js
export const DivProducts = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  > :nth-child(2) {
    display: grid;
    grid-template-columns: repeat(auto-fit, 290px);
    grid-row-gap: .5rem;
    grid-column-gap: .5rem;
    justify-content: center;	
  }
  > :last-child {
    align-self: center;    
    display: flex;
    list-style: none;
    height: 2.5em;
    border: 1px solid black;
    border-radius: 5px;
    width: fit-content;
    align-items: center;
    padding: 0;
    margin-top: 40px;
    > li > a {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    > .active > a {
      font-weight: bold;
      text-decoration: underline;
      pointer-events: none;
    }
    > .disabled > a {
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
    }
  }
`

//Product.js
export const DivProduct = styled.div`
  height: 400px;
  width: 290px;
  background: #f8f9fa;
  border-radius: 10px;
  &:hover {
    box-shadow: .1rem .1rem 1rem .1rem rgba(0,0,0,.3);
    text-decoration: none;
  }
  > a {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5em;
    color: #343a40;
    &:hover {
      text-decoration: none;
    }
    > img {
      align-self: center;
    }
  }
`

//about.js
export const DivAbout = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`

//Footer.js
export const StyledFooter = styled.footer`
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
      background: #28a745;
      > select {
        background: #28a745;
        border: 1px solid #28a745;
      }
    }
    > :nth-child(2) {
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
`
