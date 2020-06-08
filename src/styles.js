import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle` 
  * {
    box-sizing: border-box;
    &:not([data-offset-key]):not([data-text]) {
      font-family: 'Roboto Condensed', sans-serif;
    }
  }

  html, body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Georgia, sans-serif;
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
      align-self: center;
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

//AuthForm.js
export const DivAuthWrapper = styled.div`
  grid-area: 1 / 1 / 4 / 4;
  position: absolute;
  overflow: auto;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  z-index: 16;
  > div {
    position: absolute;
    margin-top: 2.5em;
    background: #f8f9fa;
    width: auto;
    padding: 2rem;
    min-width: 300px;
    left: 50%;
    transform: translateX(-50%);
  }
`
export const DivAuthButtons = styled.div`
  width: 100%;
  > button {
    width: 50%;
    display: inline-block;
    border-radius: 0;
    padding: 0 .5em 0 .5em;
  }
`
export const DivResetPasswordHeader = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1em;
`

//authForm/logIn.js
export const DivLogIn = styled.div`
  padding: 1em;
  > form {
    display: flex;
    flex-direction: column;
    > label {
      display: flex;
      flex-direction: column;
      user-select: none;
      > input {
        padding: 0 .2em 0 .2em;
      }
      > :nth-child(2) {
        color: red;
      }
    }
    > :nth-child(3) {
      margin-bottom: 1em;
      > label {
        user-select: none;
      }
    }
    > :nth-child(4) {
      margin-top: .5em;
    }
  }
`

//authForm/Registration.js
export const DivRegistration = styled.div`
  padding: 1em;
  > form {
    display: flex;
    flex-direction: column;
    > label {
      display: flex;
      flex-direction: column;
      user-select: none;
      > input {
        padding: 0 .2em 0 .2em;
      }
      > :nth-child(2) {
        color: red;
      }
    }
    > :nth-child(5) {
      margin-top: .5em;
    }
  }
`

//authForm/ResetPassword.js
export const DivResetPassword = styled.div`
  padding: 1em;
  > button {
    margin-bottom: 1em;
  }
  > form {
    display: flex;
    flex-direction: column;
    > label {
      display: flex;
      flex-direction: column;
      > input {
        padding: 0 .2em 0 .2em;
      }
    }
    > button {
      margin-top: .5em;
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

//products/mobile-phones,laptops,tablets/[id].js
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
    margin-top: 2.5em;
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

//sales/[category].js
export const DivSales = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  justify-self: center;
  display: flex;
  flex-direction: column;
  > :first-child {
    display: flex;
    flex-direction: column;
    width: 100%;
    > img {
      width: 100%;
      height: 100%;
    }
    > :last-child {
      margin: auto;
      > :first-child {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
  > :last-child {
    display: grid;
    grid-template-columns: repeat(auto-fit, 290px);
    grid-row-gap: .5rem;
    grid-column-gap: .5rem;
    justify-content: center;	
    margin-top: 1em;
  }
`

//ProductListItem.js
export const DivProductListItem = styled.div`
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
    > span > span > :last-child {
      color: yellow;
      stroke: black;
      stroke-width: 30;
    }
    > :last-child {
      display: flex;
      justify-content: space-between;
      > div {
        background: #dc3545;
        color: white;
        margin: 0 1.5em 0 1.5em;
        padding: .3em .5em .2em .5em;
        border-radius: 5px;
      }
    }
  }
`

//product-page/[id].js
export const DivProductPage = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  > :first-child {
    align-self: flex-start;
  }
  > .carousel-root {
    margin-bottom: 2em;
    max-width: 400px;
    max-height: 400px;
    > div > .thumbs-wrapper > ul {
      padding: 0;
      display: flex;
      justify-content: center;
      > :nth-child(3) {
        margin-right: 0;
      }
    }
  }
  > :nth-child(3) {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    > span > span > :last-child {
      color: yellow;
      stroke: black;
      stroke-width: 25;
    }
  }
  > :nth-child(4) {
    display: flex;
    align-content: flex-start;
    align-items: flex-start;
    align-self: flex-start;
    padding-left: 1rem;
    padding-right: 1rem;
    > :first-child > div {
      display: flex;
      flex-direction: column;
      > h6 > button {
        margin-right: 1em;
      }
    }
    > :last-child {
      background: #dc3545;
      color: white;
      margin: 0 1.5em 0 1.5em;
      padding: .2em .5em .2em .5em;
      border-radius: 5px;
    }
  }
  > :nth-child(5) {
    align-self: stretch;
    > button {
      width: 50%;
      margin-top: 2.5em;
      padding: .5em 2em .5em 2em;
      box-shadow: none;
      border-radius: 0;
    }
  }
  > :nth-child(6) {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #fff; 
    > :first-child {
      background: #f8f9fa;      
      > .wrapper {
        width: 100%;
        .colorPickerPopup {
          top: 23px;
        }
        .linkPopup {
          left: -42px;
          top: 23px;
          height: 233px;
        }
        .emojiPopup {
          top: 23px;
          left: -148px;
        }
        .embeddedPopup {
          top: 23px;
          left: -111px;
        }
        .imagePopup {
          top: 23px;
          left: -186px;
        }
        > .editor {        
          width: 100%;
          padding: 0 1em 0 1em;
          border-bottom: 1px solid #F1F1F1;
        }
      }
    }
    > .post-button {
      align-self: flex-start;
      margin: 1em 0 0 1em;
    }
    > .note {
      align-self: center;
      margin-top: 1em;
    }
    > .review {
      padding: 1em;
      margin-bottom: 1em;
      > :first-child {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: .5em;
        > :first-child {
          display: flex;        
          align-items: flex-end; 
          > img {
            margin-right: .5em;
          }
          > :nth-child(2) {
            margin-right: .5em;         
          }
          > :last-child {
            cursor: pointer;
            &:hover {
              opacity: 0.6;
            } 
          }
        } 
      }
      > .wrapper {
        border: 1px solid black;
        border-radius: 5px;
        width: 100%;
      }
      > :last-child {
        display: flex;
      }
    }
  }


`

//search/[value].js
export const DivSearchResults = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
`

//SearchResult.js
export const DivSearchResult = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  border: 1px solid #dc3545;
  border-radius: 5px;
  background: #f8f9fa;
  margin: .5em;
  padding: 1em;
  > :first-child {
    grid-area: 1 / 1 / 2 / 2;
    margin-right: 1rem;
  }
  > :nth-child(2) {
    grid-area: 1 / 2 / 2 / 3;
    align-self: start;
    justify-self: center;
    display: flex;
    flex-direction: column;
    > a, a:hover, a:focus {
      color: #343a40;
      text-decoration: none;
    }
    > a:hover, a:focus {
      text-shadow: 2px 2px 20px;
    }
    > h6 {
      color: #007bff;
    }
    > span > span > :last-child {
      color: yellow;
      stroke: black;
      stroke-width: 25;
    }
  }
  > :last-child {
    grid-area: 2 / 1 / 3 / 3;    
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 1em;
    > h3 {
      margin-bottom: 0;
    }
    > div {
      background: #dc3545;
      color: white;
      margin: 0 1.5em 0 1.5em;
      padding: .3em .5em .2em .5em;
      border-radius: 5px;
    }
  }
`

//cart.js
export const DivCart = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  > h2 {
    display: flex;
    justify-content: center;
  }
`

//CartList.js
export const DivCartList = styled.div`
  width: 100%;
  > :first-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.5em;
  }
  > :nth-child(2) {
    margin-bottom: 2.5em;
  }
  > :nth-child(3) {
    display: flex;
    flex-direction: column;
    > h1, h2 {
      display: flex;
      > span {
        display: flex;
        padding-left: 1em;
      }
    }
  }
`

//CartListItem.js
export const DivCartListItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 2fr 1fr auto;
  grid-template-rows: auto auto;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  border-radius: 5px;
  background: #f8f9fa;
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #dc3545;
  > :first-child {
    grid-area: 1 / 1 / 2 / 2;
  }
  > :nth-child(2) {
    grid-area: 1 / 2 / 2 / 5;
    > a, a:hover, a:focus {
      text-decoration: none;
      > h5 {
        color: #343a40;
      }
    }
    > a:hover, a:focus {
      text-shadow: 2px 2px 20px;
    }
  }
  > :nth-child(3) {
    grid-area: 2 / 1 / 3 / 6;
    justify-self: start;
    display: flex;
    flex-direction: column;
    > h6 {
      display: flex;
      align-items: flex-start;
      margin-bottom: 0;
    }
    > h5 {
      display: flex;
      > :nth-child(2) {
        margin-left: .2em;
      }
    }
  }
  > :last-child {
    grid-area: 1 / 5 / 2 / 6;
    justify-self: end;
  }
`

//about.js
export const DivAbout = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  background: #f8f9fa;
  border-radius: 5px;
  padding: 2.5em;
  > p {
    text-align: justify;
    text-justify: inter-word;
    > img {
      display: block;
      margin: 0 auto 1em auto;
      float: none;
    }
  }
`

//contact-us.js
export const DivContactForm = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  border-radius: 5px;
  padding: 2.5em;
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
