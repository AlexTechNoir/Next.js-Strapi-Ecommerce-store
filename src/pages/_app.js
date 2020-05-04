import React from 'react'
import App from 'next/app'
import { withRouter } from 'next/router'
import Context from '../context'
import { data } from '../data'

class ContextProvider extends App {
  constructor() {
    super()
    this.state = {
      data: [],
      itemsPerPage: 8
    }
  }

  componentDidMount() {
    let tempData = []
    data.forEach(dataItem => {
      const item = {...dataItem}
      tempData = [...tempData, item] 
    })
    this.setState(() => {
      return { data: tempData }
    })
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
