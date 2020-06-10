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
      cartSubTotalPrice: 0,
      fetchedRates: {},
      currency: '€',
      ratings: []
    }

    this.refreshCart = this.refreshCart.bind(this)
    this.clearCart = this.clearCart.bind(this)
    this.evaluateTotalPrice = this.evaluateTotalPrice.bind(this)
    this.refreshCurrency = this.refreshCurrency.bind(this)
    this.refreshRatings = this.refreshRatings.bind(this)
  }

  async componentDidMount() {
    if (localStorage.getItem('cartList') === null) {
      localStorage.setItem('cartList', JSON.stringify([]))
    }

    if (localStorage.getItem('currency') === null) {
      localStorage.setItem('currency', JSON.stringify('€'))
    }

    if (localStorage.getItem('ratings') === null) {
      localStorage.setItem('ratings', JSON.stringify([]))
    }

    await fetch('https://api.exchangeratesapi.io/latest')
      .then(r => {
        if (r.status >= 400) {
          return r.json().then(errResData => {
            const err = new Error('Error.')
            err.data = errResData
            throw err
          })
        }
        return r.json()
      }).then(r => {  
        this.setState({
          cartList: JSON.parse(localStorage.cartList),
          fetchedRates: r.rates,
          currency: JSON.parse(localStorage.currency),
          ratings: JSON.parse(localStorage.ratings)
        }) 
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
      const cartSubTotalPrice = (cartList[0].totalPrice * cartList[0].discount).toFixed(2)
      this.setState({
        cartSubTotalPrice: cartSubTotalPrice
      })
    } else {
      const cartSubTotalPrice = cartList.reduce((acc, cur) => acc + (cur.totalPrice * cur.discount), 0)
      this.setState({
        cartSubTotalPrice: cartSubTotalPrice
      })
    }
  }

  refreshCurrency() {
    this.setState({
      currency: JSON.parse(localStorage.currency)
    })
  }

  refreshRatings() {
    this.setState({
      ratings: JSON.parse(localStorage.ratings)
    })
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Context.Provider value={{
        ...this.state,
        refreshCart: this.refreshCart,
        clearCart: this.clearCart,
        evaluateTotalPrice: this.evaluateTotalPrice,
        refreshCurrency: this.refreshCurrency,
        refreshRatings: this.refreshRatings
      }}>
        <Component {...pageProps} />
      </Context.Provider>
    )
  }
}

export default withRouter(ContextProvider)
