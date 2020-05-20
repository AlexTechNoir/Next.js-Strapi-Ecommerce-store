import React from 'react'
import App from 'next/app'
import { withRouter } from 'next/router'
import Context from '../context'

class ContextProvider extends App {
  constructor() {
    super()
    this.state = {
      itemsPerPage: 8
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Context.Provider value={{
        ...this.state
      }}>
        <Component {...pageProps} />
      </Context.Provider>
    )
  }
}

export default withRouter(ContextProvider)
