import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import CurrencyContext from '../../../context/currencyContext'
import CartContext from '../../../context/cartContext'

export default function CartListItem({ cartListItem, assignProductAmountInCart, estimateTotalPrice }) {
  const id = parseFloat(cartListItem.id)
  const attributes = cartListItem.attributes

  const title = attributes.title
  const company = attributes.company
  const price = attributes.price
  const available = attributes.available

  const imgsArr = attributes.image.data
  const img = imgsArr.filter(i => i.attributes.name === "01.jpg")
  const imgUrl = img[0].attributes.url
  
  const { fetchedRates, currency } = useContext(CurrencyContext)
  const { cartBadgeToggle, setCartBadgeToggle } = useContext(CartContext)

  const [ currentTotalPrice, setCurrentTotalPrice ] = useState(0)

  let options = []

  for (let i = 1; i <= available; i++) {
    options.push(<option key={i} value={`${i}`}>{i}</option>)
  }

  let currencyRate = 1
  
  if (currency === '€') {
    currencyRate = fetchedRates.EUR
  } else if (currency === '₽') {
    currencyRate = fetchedRates.RUB
  } else if (currency === 'Ch¥') {
    currencyRate = fetchedRates.CNY
  } else if (currency === 'Jp¥') {
    currencyRate = fetchedRates.JPY
  } else if (currency === '₩') {
    currencyRate = fetchedRates.KRW
  } else if (currency === '₹') {
    currencyRate = fetchedRates.INR
  }

  const estimatePrice = () => {
    const cartList = JSON.parse(localStorage.cartList)
    const item = cartList.filter(i => parseFloat(i.id) === id)
    const selectedAmount = parseFloat(item[0].selectedAmount)

    const select = document.getElementById(`itemsOf${id}`)
    select.options[selectedAmount - 1].selected = 'selected'

    setCurrentTotalPrice(parseFloat(price * selectedAmount).toFixed(2))
  }

  const editAmount = async (id, price) => {
    const cartList = JSON.parse(localStorage.cartList)
    const selectedAmount = document.getElementById(`itemsOf${id}`).value

    const editedCartList = cartList.map(i => {
      if (parseFloat(i.id) === id) {
        i.selectedAmount = +selectedAmount
        return i
      } else {
        i = i
        return i
      }
    })

    localStorage.setItem('cartList', JSON.stringify(editedCartList))

    const updTotalPrice = parseFloat(price * selectedAmount).toFixed(2)
    setCurrentTotalPrice(updTotalPrice)

    estimateTotalPrice()
  }

  const deleteItem = id => {
    const cartList = JSON.parse(localStorage.cartList)

    const editedCartList = cartList.filter(i => parseFloat(i.id) !== id)

    if (editedCartList.length === 0) {
      localStorage.removeItem('cartList')
      assignProductAmountInCart()
    } else {
      localStorage.setItem('cartList', JSON.stringify(editedCartList))
      assignProductAmountInCart()
    }
    
    setCartBadgeToggle(!cartBadgeToggle)
    estimateTotalPrice()
  }

  useEffect(() => {
    estimatePrice()
  }, [])

  return (
    <DivCartListItem>
      <img src={imgUrl} alt={title} width={100} height={100} />
      <div>
        <Link href="/product-page/[id].js" as={`/product-page/${id}`}>
          <a>
            <h5>{title}</h5>
          </a>
        </Link>
        <h6>
          Company: {company}
        </h6>
      </div>
      <div>
        <label htmlFor={`itemsOf${id}`}>
          Quantity:&nbsp;
          <select className="form-control" id={`itemsOf${id}`} onChange={() => editAmount(id, price)}>
            {options}
          </select>
        </label>
      </div>
      <h5>
        <span>Total price:</span>
        <span className="d-flex no-wrap">
          <span className="align-self-end">{currency}</span>&nbsp;
          <span className="align-self-end">{(currentTotalPrice * currencyRate).toFixed(2)}</span>
        </span>
      </h5>
      <button
        type="button"
        className="close text-danger d-inline-block"
        aria-label="Close"
        onClick={() => deleteItem(id)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </DivCartListItem>
  )
}

const DivCartListItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 2fr 1fr auto;
  grid-template-rows: auto auto auto;
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
    display: flex;
    flex-direction: column;
    width: 100%;
    > a, a:hover, a:focus {
      text-decoration: none;
      width: 100%;
      > h5 {
        color: #343a40;
      }
    }
    > a:hover, a:focus {
      text-shadow: 2px 2px 20px;
    }
  }
  > :nth-child(3) {
    grid-area: 2 / 1 / 3 / 5;
    display: flex;
    align-items: flex-start;
    margin-bottom: 0;
  }
  > :nth-child(4) {
    grid-area: 3 / 1 / 4 / 5;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    > :nth-child(2) {
      margin-left: .2em;
    }
  }
  > :last-child {
    grid-area: 1 / 5 / 2 / 6;
    justify-self: end;
  }

  @media only screen and (min-width: 500px) {
    grid-template-columns: auto 1fr 1fr 1fr auto;
    grid-template-rows: auto;
    > :nth-child(2) {
      grid-area: 1 / 2 / 2 / 3;
    }
    > :nth-child(3) {
      grid-area: 1 / 3 / 2 / 4;
    }
    > :nth-child(4) {
      grid-area: 1 / 4 / 2 / 5;
      justify-self: end;
    }
  }
`
