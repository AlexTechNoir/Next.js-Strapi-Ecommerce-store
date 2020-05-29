import React from 'react'
import App from 'next/app'
import { withRouter } from 'next/router'
import Context from '../context'

class ContextProvider extends App {
  constructor() {
    super()
    this.state = {
      itemsPerPage: 8,
      cartList: []
    }

    this.refreshCart = this.refreshCart.bind(this)
    this.clearCart = this.clearCart.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('cartList') === null) {
      localStorage.setItem('cartList', JSON.stringify([]))
    }
    
    this.setState({
      cartList: JSON.parse(localStorage.cartList)
    })
  }

  refreshCart() {
    this.setState({
      cartList: JSON.parse(localStorage.cartList)
    })
  }
  
  clearCart() {
    localStorage.setItem('cartList', JSON.stringify([]))
    this.setState({
      cartList: JSON.parse(localStorage.cartList)
    })
    window.scrollTo(0,0)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Context.Provider value={{
        ...this.state,
        refreshCart: this.refreshCart,
        clearCart: this.clearCart
      }}>
        <Component {...pageProps} />
      </Context.Provider>
    )
  }
}

export default withRouter(ContextProvider)
