import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AddToCart({ dataItem , chooseAmount, selectedAmount}) {
  const { id, price, hasDiscount, inStock } = dataItem

  const [ item, setItem ] = useState(dataItem)
  const [ isInCart, setIsInCart ] = useState(dataItem.isInCart)
  
  const updInStock = inStock - selectedAmount
  const updTotalPrice = price * selectedAmount

  let options = []
  
  for (let i = 1; i <= inStock; i++) {
    options.push(<option value={`${i}`}>{i}</option>)
  }

  const fetcher = () => {
    axios(`http://localhost:3000/api/data?category=object&id=${id}`)
      .then(r => {
        if (r.status >= 400) {
          return r.then(errResData => {
            const err = new Error('Error.')
            err.data = errResData
            throw err
          })
        }
        setItem(r.data)
        setIsInCart(r.data.isInCart)
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (localStorage.getItem('cartList') === null) {
      fetcher()
    } else if (localStorage.getItem('cartList') !== null) {
      const cartList = JSON.parse(localStorage.cartList)
      const cartListItem = cartList.find(cartListItem => cartListItem.id === id)
      if (cartListItem !== undefined) {
        setItem(cartListItem)
        setIsInCart(cartListItem.isInCart)
      } else if (cartListItem === undefined) {
        fetcher()
      }
    }
  }, [])

  const addToCart = (id, updInStock, selectedAmount, updTotalPrice) => {
    fetch(`http://localhost:3000/api/cart/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        inStock: updInStock,
        amountInCart: selectedAmount,
        totalPrice: updTotalPrice
      })
    }).then(r => {
      if (r.status >= 400) {
        return r.json().then(errResData => {
          const err = new Error('Error.')
          err.data = errResData
          throw err
        })
      }
      return r.json()
    }).then(r => { 
      if (localStorage.getItem('cartList') === null || JSON.parse(localStorage.cartList).length < 1) {
        localStorage.setItem('cartList', JSON.stringify(r))
        const cartList = JSON.parse(localStorage.cartList)
        const cartListItem = cartList.find(cartListItem => cartListItem.id === id)
        if (cartListItem !== undefined) {
          setItem(cartListItem)
          setIsInCart(cartListItem.isInCart)
        } else if (cartListItem === undefined) {
          fetcher()
        }
      } else if (localStorage.getItem('cartList') !== null) {
        const item = r[0]
        const cartList = JSON.parse(localStorage.cartList)
        cartList.push(item)
        localStorage.setItem('cartList', JSON.stringify(cartList))
        const cartListItem = cartList.find(cartListItem => cartListItem.id === id)
        if (cartListItem !== undefined) {
          setItem(cartListItem)
          setIsInCart(cartListItem.isInCart)
          console.log(isInCart)
        } else if (cartListItem === undefined) {
          fetcher()
        }
      }
    })
  }

  const cancelAdding = (id, inStock, amountInCart) => {
    fetch(`http://localhost:3000/api/cart/${id}?type=cancel`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        inStock: inStock,
        amountInCart: amountInCart
      })
    }).then(r => {
      if (r.status >= 400) {
        return r.json().then(errResData => {
          const err = new Error('Error.')
          err.data = errResData
          throw err
        })
      }
      return r.json()
    }).then(r => { 
      const item = r[0]
      const cartList = JSON.parse(localStorage.cartList)
      const filteredCartList = cartList.filter(cartListItem => cartListItem.id !== parseInt(item.id))
      localStorage.setItem('cartList', JSON.stringify(filteredCartList))
      setItem(item)
      setIsInCart(item.isInCart)
    })
  }

  return (
    <div>
      <h3>
        {
          isInCart
          ? <div>
              <h6>
                <button 
                  type="button" 
                  className="btn btn-warning"
                  onClick={() => {
                    cancelAdding(id, inStock, item.amountInCart)
                  }}
                >
                  Added (cancel)
                </button>
              </h6>
            </div>
          : <div>
              <label htmlFor="items">
                In stock:
                <select id="items" onChange={chooseAmount}>
                  {options}
                </select>
              </label>
              <h6>
                <button 
                  type="button"
                  className="btn btn-warning" 
                  onClick={() => {
                    addToCart(id, updInStock, selectedAmount, updTotalPrice)
                  }}
                >
                  Add to cart
                </button>
              </h6>
            </div>
        }
      </h3>
      {
        isInCart
        ? <div>
            <span>In cart: {item.amountInCart}</span>
          </div>
        : <div className="invisible"></div>
      }
    </div>
  )
}
