import { useState, useEffect, useContext } from 'react'
import CartContext from '../../context/cartContext'

export default function AddToCart({ id, available }) {
  const { cartBadgeToggle, setCartBadgeToggle } = useContext(CartContext)

  const [ selectedAmount, setSelectedAmount ] = useState(1)
  const [ isProductInCart, setIsProductInCart ] = useState(false)
  const [ amountInCart, setAmountInCart ] = useState(null)

  const chooseAmount = () => setSelectedAmount(parseInt(document.getElementById("items").value))  

  const addToCart = (id, selectedAmount) => {

    const addedProduct = { id, selectedAmount }
    
    let cartList

    if (localStorage.getItem('cartList') === null) {
      cartList = []
      cartList.push(addedProduct)
      localStorage.setItem('cartList', JSON.stringify(cartList))
    } else {
      cartList = JSON.parse(localStorage.cartList)
      cartList.push(addedProduct)
      localStorage.setItem('cartList', JSON.stringify(cartList))
    }

    setAmountInCart(selectedAmount)
    setIsProductInCart(true)
    setCartBadgeToggle(!cartBadgeToggle)
  }

  const cancelAdding = id => {
    const cartList = JSON.parse(localStorage.cartList)
    const filteredCartList = cartList.filter(i => i.id !== id)

    localStorage.setItem('cartList', JSON.stringify(filteredCartList))

    setIsProductInCart(false)
    setCartBadgeToggle(!cartBadgeToggle)
  }

  let options = []
  
  for (let i = 1; i <= available; i++) {
    options.push(<option value={i} key={i}>{i}</option>)
  }

  useEffect(() => {
    if (localStorage.getItem('cartList') === null) {
      setIsProductInCart(false)
    } else {

      const cartList = JSON.parse(localStorage.cartList)
      const isProductAlreadyInCart = cartList.find(i => i.id === id)      

      if (isProductAlreadyInCart === undefined) {
        setIsProductInCart(false)
      } else {
        const amountInCart = isProductAlreadyInCart.selectedAmount

        setAmountInCart(amountInCart)
        setIsProductInCart(true)
      }
    }
  }, [])

  return (
    <div className="add-to-cart">
      <h3>
        {
          isProductInCart
          ? (
            <div>
              <h6>
                <button type="button" className="btn btn-warning" onClick={() => cancelAdding(id)}>
                  Added (cancel)
                </button>
              </h6>
            </div>
          ) : (
            <div>
              <label htmlFor="items">
                In stock:&nbsp;
                <select id="items" onChange={() => chooseAmount()}>
                  {options}
                </select>
              </label>
              <h6>
                <button 
                  type="button"
                  className="btn btn-warning" 
                  onClick={() => addToCart(id, selectedAmount)}
                >
                  Add to cart
                </button>
              </h6>
            </div>
          )
        }
      </h3>
      {
        isProductInCart
        ? (
          <div>
            <span>In cart: {amountInCart}</span>
          </div>
        ) : (
          <div className="invisible"></div>
        )          
      }
    </div>
  )
}
