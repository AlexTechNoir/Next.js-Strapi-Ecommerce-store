import { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import CurrencyContext from '../context/currencyContext'
import dynamic from 'next/dynamic'

const CartList = dynamic(() => import('../components/cart/CartList'))

export default function Cart() {
  const { fetchedRates, currency } = useContext(CurrencyContext)

  const [ itemsAmountInCart, setItemsAmountInCart ] = useState(0)
  const [ cartList, setCartList ] = useState([])

  const assignProductAmountInCart = async () => {
    if (localStorage.getItem('cartList') !== null) {

      const cartList = JSON.parse(localStorage.cartList)
      const ids = cartList.map(i => i.id)
      
      const data = await fetch(`/api/cart?ids=${ids}`)
        .then(r => r.json())
        .catch(err => console.error(err.message))
      
      const productsInCart = data.data.products.data
      setCartList(productsInCart)
      
      const cartListLength = cartList.length
      setItemsAmountInCart(cartListLength)
      
    } else {
      setItemsAmountInCart(0)
    }
  }

  useEffect(() => {
    assignProductAmountInCart()
  }, [])

  return (
    <DivCart>
      {
        itemsAmountInCart < 1
        ? <h2>
            <div>Your shopping cart is empty</div>
          </h2>
        : <CartList 
            cartList={cartList}
            fetchedRates={fetchedRates}
            currency={currency}
            assignProductAmountInCart={assignProductAmountInCart}
          />
      }
    </DivCart>
  )
}

const DivCart = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  > h2 {
    display: flex;
    justify-content: center;
  }
`
