import React from 'react'
import App from 'next/app'
import { withRouter } from 'next/router'
import Context from '../context'

class ContextProvider extends App {
  constructor() {
    super()
    this.state = {
      itemsPerPage: 8,
      cartList: [],
      cartSubTotalPrice: 0
    }

    this.refreshCart = this.refreshCart.bind(this)
    this.clearCart = this.clearCart.bind(this)
    this.evaluateTotalPrice = this.evaluateTotalPrice.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('cartList') === null) {
      localStorage.setItem('cartList', JSON.stringify([]))
    }
    
    this.setState({
      cartList: JSON.parse(localStorage.cartList)
    })    

    this.evaluateTotalPrice()
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

  evaluateTotalPrice() {
    const cartList = JSON.parse(localStorage.cartList)

    if (cartList.length === 0) {
      this.setState({
        cartSubTotalPrice: 0
      })
    } else if (cartList.length === 1) {
      this.setState({
        cartSubTotalPrice: cartList[0].totalPrice
      })
    } else {
      this.setState({
        cartSubTotalPrice: cartList.reduce((acc, cur) => acc + cur.totalPrice, 0)
      })
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Context.Provider value={{
        ...this.state,
        refreshCart: this.refreshCart,
        clearCart: this.clearCart,
        evaluateTotalPrice: this.evaluateTotalPrice
      }}>
        <Component {...pageProps} />
      </Context.Provider>
    )
  }
}

export default withRouter(ContextProvider)
