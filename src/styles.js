import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    height: 100%;
    scroll-behavior: smooth;
    background: #e9e9e9;    
  }

  * {
    box-sizing: border-box;
  }

  #__next {
    height: 100%;
  }
`

//Layout.js
export const DivGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 1200px 1fr;
  height: 100%;
  position: relative;
`

//Header.js
export const StyledHeader = styled.header`
  grid-area: 1 / 1 / 2 / 4;
`

//index.js
export const DivIndex = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`

//about.js
export const DivAbout = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`

//Footer.js
export const StyledFooter = styled.footer`
  grid-area: 3 / 1 / 4 / 4;
`