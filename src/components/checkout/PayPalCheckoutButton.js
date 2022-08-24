import { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useRouter } from 'next/router'
import CartContext from '../../context/cartContext'

export default function PayPalCheckoutButton({ 
  formik,
  currencyCode, 
  currency,
  checkoutCartList, 
  currencyRate,
  priceForAllItems,
  tax,
  shippingCost,
  totalPrice, 
  isPayPalButtonDisabled,
  setIsPayPalButtonDisabled,
  checkItemsAmount,
  assignProductAmountInCart 
}) {

  const router = useRouter()

  const { setCartList, cartBadgeToggle, setCartBadgeToggle } = useContext(CartContext)

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currencyCode
      }
    })
  }, [currencyCode]) // triggers in pages/_app.js 

  return (
    <PayPalCheckoutDiv>
      {
        !isPending
        ? (
          <PayPalButtons 
            style={{ layout: 'vertical' }} 
            disabled={isPayPalButtonDisabled}
            forceReRender={[ totalPrice, currencyCode ]}
            createOrder={async (data, actions) => {

              const cartListWithAmounts = JSON.parse(localStorage.cartList)
              const ids = cartListWithAmounts.map(i => i.id)

              const cartListWithPrices = await fetch(`/api/available?ids=${ids}`)
                .then(r => {
                  if (r.status >= 400) {
                    const err = new Error('Error in src/components/checkout/PayPalCheckoutButton.js component, createOrder() function, if (r.status >= 400) condition')
                    err.data = r
                    throw err
                  }
                  return r.json()
                })
                .catch(err => console.error('Error in src/components/checkout/PayPalCheckoutButton.js component, createOrder() function, .catch statement, err object:', err))

              const checkoutCartList = cartListWithPrices.map(itemWithPrice => {
                for (let i = 0; i < cartListWithAmounts.length; i++) {
                  if (itemWithPrice.id === cartListWithAmounts[i].id) {

                    itemWithPrice.selectedAmount = cartListWithAmounts[i].selectedAmount
            
                    return itemWithPrice
                  }
                }
              })

              const { areAnyOfItemsOutOfStock, listOfItemsExceededAvailable } = checkItemsAmount(checkoutCartList)

              if (areAnyOfItemsOutOfStock || listOfItemsExceededAvailable.length > 0) {
                await assignProductAmountInCart()
              } else {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: currencyCode,
                        value: totalPrice
                      }
                    }
                  ],
                  application_context: {
                    shipping_preference: 'NO_SHIPPING'
                  }
                })
              }
            }}
            onApprove={(data, actions) => {

              setIsPayPalButtonDisabled(true)
              
              return actions.order.capture().then(async res => {

                const orderDetails = formik.values

                const purchasedItems = checkoutCartList.map(i => {

                  const attributes = i.attributes
                  const discount = attributes.discount.data
                  const discountMultiplier = discount === null ? 1 : discount.attributes.discountMultiplier

                  return {
                    productId: i.id,
                    title: attributes.title,
                    pricePerItem: ((attributes.price * discountMultiplier) * currencyRate).toFixed(2),
                    available: attributes.available,
                    selectedAmount: i.selectedAmount.toString(),
                    priceForAllUnits: (((attributes.price * discountMultiplier) * currencyRate) * i.selectedAmount).toFixed(2)
                  }
                })
                
                const order = {
                  orderId: res.id,
                  customerInfo: {
                    fullName: orderDetails.fullName,
                    email: orderDetails.email,
                    mobilePhone: orderDetails.mobilePhone,
                    country: orderDetails.country,
                    stateOrCounty: orderDetails.stateOrCounty,
                    city: orderDetails.city,
                    address: orderDetails.address,
                    postcode: orderDetails.postcode,
                    deliveryOption: orderDetails.delivery
                  },
                  purchase: {
                    currencyCode: currencyCode,
                    currency: currency,
                    purchasedItems: purchasedItems,
                    priceForAllItems: priceForAllItems,
                    tax: tax,
                    shippingCost: shippingCost,
                    totalPrice: totalPrice,
                    timeOfPurcahse: res.purchase_units[0].payments.captures[0].create_time,
                    paymentMethod: data.paymentSource
                  }
                }

                await fetch(`/api/order?order=${encodeURIComponent(JSON.stringify(order))}`)
                  .then(r => {
                    if (r.status >= 400) {
                      return r.json().then(errResData => {
                        const err = new Error('Error in components/checkout/PayPalCheckoutButton.js, onApprove() function, if (r.status >= 400) condition')
                        err.data = errResData
                        throw err
                      })
                    }
                    return r.json()
                  })
                  .then(res => {

                    setCartList([])
                    localStorage.removeItem('cartList')
                    localStorage.removeItem('order')
                    localStorage.removeItem('isFormSubmitted')
                    setCartBadgeToggle(!cartBadgeToggle)

                    router.push(`/thank-you?id=${res.id}`)
                  })
                  .catch(err => console.error('Error in src/components/checkout/PayPalCheckoutButton.js component, onApprove() function, .catch statement, err.data object:', err.data))
              })
            }}
          />
        ) : (
          <div className="loader"></div>
        )
      }
    </PayPalCheckoutDiv>
  )
}

const PayPalCheckoutDiv = styled.div`
  align-self: flex-start;
  width: 290px;
  grid-area: 5 / 1 / 6 / 2;

  @media only screen and (max-width: 426px) {
    width: 100%;
    margin-top: 16px;
  }
`
