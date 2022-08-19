import { useState, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

export default function CartListItem({ 
  cartListItem,   
  assignProductAmountInCart, 
  estimateTotalPriceOfAllItems, 
  currency,
  currencyRate, 
  isCurrencySet,
  cartBadgeToggle,
  setCartBadgeToggle, 
  itemsWithExceededAmount,
  checkIfItemsAreAvailable
}) {
  const id = cartListItem.id
  const attributes = cartListItem.attributes

  const title = attributes.title
  const company = attributes.company
  const price = attributes.price
  const available = attributes.available

  const imgsArr = attributes.image.data
  const img = imgsArr.filter(i => i.attributes.name === "01.jpg")
  const imgUrl = img[0].attributes.url

  // check if discount is present, because if it's not, we can't access the value and put it into variable
  let discountMultiplier
  if (attributes.discount.data !== null) {
    discountMultiplier = attributes.discount.data.attributes.discountMultiplier
  }

  const [ selectBorderColor, setSelectBorderColor ] = useState('lightgrey')
  const [ currentTotalPrice, setCurrentTotalPrice ] = useState(0)

  let options = []

  //render option elements based on available amount
  for (let i = 1; i <= available; i++) {
    options.push(<option key={i} value={`${i}`}>{i}</option>)
  }

  // this function fires initially and every time <available> value changes (below in useEffect). <available> is a key inside of <cartList>, thus depends on <cartList> change, that happens in assignProductAmountInCart() function, which lives in pages/_app.js and is spread through Context. assignProductAmountInCart() is triggered: 1. by useEffect in pages/cart.js initially, 2. in clearCart() function (on button click) in components/cart/CartList.js component, and 3. in goToCheckout() function (also on button click) also in components/cart/CartList.js component
  const estimatePrice = () => {

    const cartList = JSON.parse(localStorage.cartList)
    const item = cartList.filter(i => i.id === id)
    const selectedAmount = parseFloat(item[0].selectedAmount)    

    // if there are enough units of item available in stock...
    if (selectedAmount <= available) {

      const select = document.getElementById(`itemsOf${id}`)
      if (select !== null) {
        // ...we set selected by user amount as it should be, ...
        select.options[selectedAmount].selected = 'selected'
        setCurrentTotalPrice(parseFloat(price * selectedAmount).toFixed(2))
        setSelectBorderColor('lightgrey')
      }  
    
    // ...but if items in stock are not enough comparing to amount user selected...
    } else if (selectedAmount > available) {

      const select = document.getElementById(`itemsOf${id}`)
      if (select !== null) {
        // ...we set option as 'unselected' (which is the first in array of option elements)...
        select.options[0].selected = 'selected'

        // ...and price as zero
        setCurrentTotalPrice((0).toFixed(2))
        setSelectBorderColor('red')
      } 
    }

    // in condition above we don't need to check if available !== 0, because if it does === 0, <select> element just won't render, user will see "out of stock" message instead, and then we don't need to make any changes ("available === 0" and "0 < selectedAmount <= available" are different cases to handle)
  }

  const editAmount = (id, price) => {

    const selectedAmount = document.getElementById(`itemsOf${id}`).value

    const editedCartList = JSON.parse(localStorage.cartList).map(i => {
      if (i.id === id) {
        i.selectedAmount = +selectedAmount
        return i
      } else {
        i = i
        return i
      }
    })

    localStorage.setItem('cartList', JSON.stringify(editedCartList))

    // set total price of one item
    const updTotalPriceOfOneItem = Number(price.toFixed(2)) * selectedAmount
    setCurrentTotalPrice(updTotalPriceOfOneItem)

    // estimate total price of all items
    // this function lives in pages/_app.js
    estimateTotalPriceOfAllItems()

    // we launch this function in case when user edits amount of item that exceeded available amount in CMS, to toggle border colour (from red to lightgrey)
    checkIfItemsAreAvailable()
  }

  const deleteItem = id => {

    const editedCartList = JSON.parse(localStorage.cartList).filter(i => i.id !== id)

    if (editedCartList.length === 0) {

      localStorage.removeItem('cartList')
      localStorage.removeItem('order')
      localStorage.removeItem('isFormSubmitted')
      assignProductAmountInCart()

    } else {

      localStorage.setItem('cartList', JSON.stringify(editedCartList))
      assignProductAmountInCart()
    }
    
    // toggle cart badge state to change number of items in cart badge (in components/layout/header/CartButton.js)
    setCartBadgeToggle(!cartBadgeToggle)

    estimateTotalPriceOfAllItems()
  }

  const toggleBorderColour = () => {

    if (itemsWithExceededAmount.length > 0) {
      
      const isThisItemWithExceededAmount = itemsWithExceededAmount.some(i => i === id.toString())      

      if (isThisItemWithExceededAmount) {
        setSelectBorderColor('#dc3545')
      } else {
        setSelectBorderColor('lightgrey')
      }
    } else {
      setSelectBorderColor('lightgrey')
    }
  }

  useEffect(() => {
    estimatePrice()
  }, [available])

  useEffect(() => {
    toggleBorderColour()
  },[itemsWithExceededAmount]) // triggers in components/cart/CartList.js in checkIfItemsAreAvailable() and goToCheckout()

  return (
    <DivCartListItem selectBorderColor={selectBorderColor} tabIndex="0">
      <img className="image" src={imgUrl} alt={title} width={100} height={100} />

      <div className="title-and-company">
        <Link href={`/product-page/${id}`}>
          <a>
            <h5>{title}</h5>
          </a>
        </Link>
        <h6>
          Company: {company}
        </h6>
      </div>

      <div className="quantity">
        {
          available <= 0 
          ? (
            <div className="out-of-stock">
              <h4 className="out-of-stock-text text-danger">
                OUT OF STOCK!
              </h4>
            </div>
          ) : (
            <label htmlFor={`itemsOf${id}`}>
              Quantity:&nbsp;
              <select className="form-control" id={`itemsOf${id}`} onChange={() => editAmount(id, price)}>
                <option value="-" disabled> - </option>      
                {options}
              </select>
            </label>
          )
        }
      </div>

      {
        isCurrencySet
        ? (
          <h5 className="price-info">
            <span>Total price:</span>
            {
              attributes.discount.data === null
              ? (
                <span className="price d-flex no-wrap">
                  <span className="align-self-end">{currency}</span>&nbsp;
                  <span className="align-self-end">{(currentTotalPrice * currencyRate).toFixed(2)}</span>
                </span>
              ) : (
                <span className="price d-flex flex-column">
                  <s className="d-flex no-wrap">
                    <span>{currency}</span>&nbsp;
                    <span>{(currentTotalPrice * currencyRate).toFixed(2)}</span>
                  </s>
                  <span className="d-flex no-wrap text-danger">
                    <span>{currency}</span>&nbsp;
                    <span>{((currentTotalPrice * currencyRate) * discountMultiplier).toFixed(2)}</span>
                  </span>
                </span>
              )
            }
          </h5>
        ) : (
          <div className="loader"></div>
        )
      }

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
  grid-template-columns: auto 1fr 1fr 1fr auto;
  grid-template-rows: auto;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  border-radius: 5px;
  background: #f8f9fa;
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #dc3545;
  > .image {
    grid-area: 1 / 1 / 2 / 2;
  }
  > .title-and-company {
    grid-area: 1 / 2 / 2 / 3;    
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
  > .quantity {
    grid-area: 1 / 3 / 2 / 4;    
    display: flex;
    align-items: flex-start;
    margin-bottom: 0;
    > label > .form-control {
      border-color: ${props => props.selectBorderColor};
    }
    > .out-of-stock {
      position: relative;
      > .out-of-stock-text {
        position: absolute;
        top: 2px;
        left: 3px;
        transform: rotate(14deg);
      }
    }
  }
  > .price-info {
    grid-area: 1 / 4 / 2 / 5;
    justify-self: end;    
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    > .price {
      margin-left: .2em;
    }
  }
  > .loader {
    justify-self: end;
  }
  > .close {
    grid-area: 1 / 5 / 2 / 6;
    justify-self: end;
    align-self: start;
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: auto 1fr 2fr 1fr auto;
    grid-template-rows: auto auto auto;
    > .title-and-company {
      grid-area: 1 / 2 / 2 / 5;
    }
    > .quantity {
      grid-area: 2 / 1 / 3 / 5;
    }
    > .price-info {
      grid-area: 3 / 1 / 4 / 5;
    }
  }
`
