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
      currentPage: 1,
      itemsPerPage: 8
    }

    this.paginate = this.paginate.bind(this)
    this.resetPage = this.resetPage.bind(this)
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

  paginate(e) { 
    window.scrollTo(0, 0)
    this.setState(() => {
      return { currentPage: e.selected + 1 }
    })
  }

  resetPage() {
    this.setState(() => {
      return { currentPage: 1 }
    })
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Context.Provider value={{
        ...this.state,
        paginate: this.paginate,
        resetPage: this.resetPage
      }}>
        <Component {...pageProps} />
      </Context.Provider>
    )
  }
}

export default withRouter(ContextProvider)
