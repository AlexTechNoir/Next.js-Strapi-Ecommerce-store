import styled from 'styled-components'
import CurrencyContext from '../context/currencyContext'
import CartContext from '../context/cartContext'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import PayPalCheckoutButton from '../components/checkout/PayPalCheckoutButton'
import CartInfo from '../components/checkout/CartInfo'
import Form from '../components/checkout/Form'

export default function Checkout() {
  
  const router = useRouter()

  const { isCurrencySet, currency, currencyRate, currencyCode } = useContext(CurrencyContext)
  const { 
    itemsAmountInCart, 
    cartList, 
    assignProductAmountInCart, 
    totalPriceInCart, 
    totalDiscountedPriceInCart,
    areThereAnyDiscountsInCart,
    estimateTotalPriceOfAllItems
  } = useContext(CartContext)

  const [ checkoutCartList, setCheckoutCartList ] = useState([])
  const [ tax, setTax ] = useState(0)
  const [ shippingCost, setShippingCost ] = useState(0)
  const [ territorialDivisionType, setTerritorialDivisionType ] = useState('')
  const [ postCodePattern, setPostCodePattern ] = useState('')
  const [ isFormSubmitted, setIsFormSubmitted ] = useState(false)
  const [ outOfStockMessage, setOutOfStockMessage ] = useState(false)
  const [ isPayPalButtonDisabled, setIsPayPalButtonDisabled ] = useState(false)

  const formik = useFormik({
    initialValues: { 
      fullName: '', 
      country: '', 
      address: '', 
      city: '', 
      stateOrCounty: '', 
      postcode: '', 
      email: '', 
      mobilePhone: '',
      delivery: ''
    },
    onSubmit: values => {
      localStorage.setItem('isFormSubmitted', JSON.stringify('yes'))
      setIsFormSubmitted(true)

      const form = document.getElementById('form')
      form.scrollIntoView()
    }
  })

  const redirect = () => {
    // if user manages to visit /checkout route with empty cart, we will redirect them to /cart
    if (itemsAmountInCart === 0 && itemsAmountInCart !== null) {
      router.push('/cart')
    }
  }

  // insert data on page reload
  const insertSavedDataInForm = () => {

    if (localStorage.getItem('order') !== null) {
      
      const order = JSON.parse(localStorage.order)

      // the next 7 lines set entered data, from localStorage, both inside formik values and visually inside form inputs
      formik.values.fullName = order.fullName ? order.fullName : formik.values.fullName
      formik.values.address = order.address ? order.address : formik.values.address
      formik.values.city = order.city ? order.city : formik.values.city
      formik.values.stateOrCounty = order.stateOrCounty ? order.stateOrCounty : formik.values.stateOrCounty
      formik.values.postcode = order.postcode ? order.postcode : formik.values.postcode
      formik.values.email = order.email ? order.email : formik.values.email
      formik.values.mobilePhone = order.mobilePhone ? order.mobilePhone : formik.values.mobilePhone
      
      formik.values.country = order.country ? order.country : formik.values.country
      // explicitly set country select input, because the line above is not enough
      if (!isFormSubmitted) {
        const country = document.getElementById('country')
        country.value = formik.values.country
      }

      formik.values.delivery = order.delivery ? order.delivery : formik.values.delivery
      // explicitly set delivery radio input, because the line above is not enough
      if (!isFormSubmitted) {
        const radioButtonAlimazonCourier = document.getElementById('alimazon-courier')
        const radioButtonDeliveryCompany = document.getElementById('delivery-company')

        if (order.delivery === 'Alimazon courier') {
          radioButtonAlimazonCourier.checked = true
        } else if (order.delivery === 'Delivery company') {
          radioButtonDeliveryCompany.checked = true
        }

        // re-estimate shipping cost based on chosen delivery
        // We could put this function in useEffect with formik.values.delivery as dependency, but it is not triggering 🤷 (see more in comment in second useEffect)
        estimateShippingCost()
      }
    }
  }

  const setCartListInCheckout = () => {

    const cartListWithAmounts = JSON.parse(localStorage.cartList)
    const cartListWithPrices = cartList
  
    const cartItems = cartListWithPrices.map(itemWithPrice => {
      for (let i = 0; i < cartListWithAmounts.length; i++) {
        if (itemWithPrice.id === cartListWithAmounts[i].id) {

          itemWithPrice.selectedAmount = cartListWithAmounts[i].selectedAmount
  
          return itemWithPrice
        }
      }
    })    

    setCheckoutCartList(cartItems)
  }

  // this is DRY helper function, it is inside toggleErrors() function here and inside createOrder() in components/checkout/PayPalCheckoutButton.js
  const checkItemsAmount = passedCheckoutCartList => {

    const areAnyOfItemsOutOfStock = passedCheckoutCartList.some(i => i.attributes.available <= 0)
    const listOfItemsExceededAvailable = passedCheckoutCartList.filter(i => i.selectedAmount > i.attributes.available)

    return { areAnyOfItemsOutOfStock, listOfItemsExceededAvailable }
  }

  const toggleErrors = () => {

    const { areAnyOfItemsOutOfStock, listOfItemsExceededAvailable } = checkItemsAmount(checkoutCartList)

    if (areAnyOfItemsOutOfStock || listOfItemsExceededAvailable.length > 0) {
      setOutOfStockMessage(true)
      setIsPayPalButtonDisabled(true)
    } else {
      setOutOfStockMessage(false)
      setIsPayPalButtonDisabled(false)
    }
  }

  // this function sets visual view of form after page reload, how user left it to be
  const setFormVisualView = () => {
    if (
      localStorage.getItem('isFormSubmitted') === null 
      || JSON.parse(localStorage.getItem('isFormSubmitted')) === 'no'
    ) {
      setIsFormSubmitted(false)      
    } else {
      setIsFormSubmitted(true)
    }
  }

  const setTaxAndFormBasedOnCountry = () => {

    const selectedCountry = document.getElementById('country')

    if (selectedCountry !== null && selectedCountry.value === 'US') {
      setTax(9)
      setTerritorialDivisionType('State')
      setPostCodePattern(`\\d{5}([ \\\\/-]\\d{4})?`)
    } else if (selectedCountry !== null && selectedCountry.value !== 'US') {
      setTax(0)
      setTerritorialDivisionType('County')
      setPostCodePattern('GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\\d{1,4}')
    }
  }

  const estimateShippingCost = () => {

    const radioButtonDeliveryCompany = document.getElementById('delivery-company')

    if (radioButtonDeliveryCompany !== null && radioButtonDeliveryCompany.checked) {
      setShippingCost(10)
    } else {
      setShippingCost(0)
    }
  }

  useEffect(() => {
    redirect()
  },[itemsAmountInCart]) // triggers in _app.js in assignProductAmountInCart()

  useEffect(() => {
    // 3 different actions in this useEffect:

    // 1. assign product amount in cart
    assignProductAmountInCart()    

    // 2. set form visual view by changing state based on localStorage data
    setFormVisualView()

    // 3. estimate shipping cost - initially here and: 1. when radio button input onChange triggers (in "handleFormFields()" in components/checkout/Form.js) 2. when enetered data set in form after page reload (in "insertSavedDataInForm()" above). We could do this in useEffect with formik.values.delivery as dependency (just like we did with formik.values.country below), but useEffect doesn't trigger on "formik.values.delivery = inputValue" (that explicit assignment needs to be done for radio buttons, unlike other inputs (because Formik doesn't have example in docs with useFormik for plain HTML radio buttons, and I couldn't find example in the Web 😅)), it triggers on "formik.handleChange(e)" (what happens for other inputs)
    estimateShippingCost()
  },[])

  useEffect(() => {
    if (cartList.length > 0) {
      estimateTotalPriceOfAllItems()
      setCartListInCheckout()
    }
  },[cartList]) // triggers in pages/_app.js in assignProductAmountInCart() and in components/checkout/PayPalCheckoutButton.js in onApprove()

  useEffect(() => {
    toggleErrors(checkoutCartList)
  },[checkoutCartList]) // triggers here in setCartListInCheckout()

  useEffect(() => {
    insertSavedDataInForm()
  },[isFormSubmitted]) // triggers here in onSubmit() in useFormik hook, here in setFormVisualView() and in components/checkout/Form.js in editShippingAddress()

  useEffect(() => {
    setTaxAndFormBasedOnCountry()
  },[formik.values.country]) // triggers here in insertSavedDataInForm()

  if (itemsAmountInCart === 0) {
    return <Redirect>Redirecting...</Redirect>
  }

  return (
    <ChekoutDiv>
      <h1 className="heading">Checkout</h1>

      <Form 
        formik={formik} 
        isFormSubmitted={isFormSubmitted} 
        territorialDivisionType={territorialDivisionType} 
        postCodePattern={postCodePattern} 
        estimateShippingCost={estimateShippingCost}
        setIsFormSubmitted={setIsFormSubmitted}
      />

      <CartInfo 
        itemsAmountInCart={itemsAmountInCart} 
        checkoutCartList={checkoutCartList} 
        isCurrencySet={isCurrencySet} 
        currency={currency}
        currencyRate={currencyRate}
        tax={tax}
        shippingCost={shippingCost}
        areThereAnyDiscountsInCart={areThereAnyDiscountsInCart}
        totalDiscountedPriceInCart={totalDiscountedPriceInCart}
        totalPriceInCart={totalPriceInCart}
      />

      {
        isFormSubmitted && outOfStockMessage 
        ? <h5 className="error-message">
            <b className="text-danger">Sorry, some items became out of stock or exceeded available amount! 🙁</b>
            <br />
            <b className="text-danger">Please, delete or choose the lesser amount of items in your cart to finish checkout process!</b>
          </h5>
        : null
      }

      {
        isFormSubmitted
        ? (
          <>
            {
              isCurrencySet
              ? (
                <PayPalScriptProvider options={{ 
                  'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                  'merchant-id': process.env.NEXT_PUBLIC_PAYPAL_MERCHANT_ID,
                  'buyer-country': formik.values.country === 'US' ? 'US' : 'GB',
                  'locale': formik.values.country === 'US' ? 'en_US' : 'en_GB',
                  'currency': currencyCode,
                  'disable-funding': 'paylater',
                }}>
                  <PayPalCheckoutButton 
                    currencyCode={currencyCode}
                    currency={currency}
                    checkoutCartList={checkoutCartList}
                    currencyRate={currencyRate}
                    priceForAllItems={
                      areThereAnyDiscountsInCart 
                      ? (totalDiscountedPriceInCart).toFixed(2) 
                      : (totalPriceInCart).toFixed(2)
                    }
                    tax={(tax).toFixed(2)}
                    shippingCost={(shippingCost).toFixed(2)}
                    totalPrice={
                      (
                        Number(areThereAnyDiscountsInCart ? totalDiscountedPriceInCart : totalPriceInCart)
                        + Number(tax * currencyRate)
                        + Number(shippingCost * currencyRate)
                      ).toFixed(2)
                    }
                    isPayPalButtonDisabled={isPayPalButtonDisabled}
                    setIsPayPalButtonDisabled={setIsPayPalButtonDisabled}
                    checkItemsAmount={checkItemsAmount}
                    assignProductAmountInCart={assignProductAmountInCart}
                  />
                </PayPalScriptProvider>
              ) : (
                <div className="loader"></div>
              )
            }
          </>
        ) : null
      }
    </ChekoutDiv>
  )
}

const Redirect = styled.h1`
  grid-area: 2 / 2 / 3 / 3;
`

const ChekoutDiv = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  align-self: start;
  display: grid;
  grid-template-rows: auto auto auto auto auto;
  grid-template-columns: 1fr 300px;
  column-gap: 16px;
  padding: 0 16px 0 16px;
  > .heading {
    grid-area: 1 / 1 / 2 / 3;
    width: 100%;
    padding-bottom: 1em;
    margin-bottom: 0;
  }
  > .error-message {
    grid-area: 3 / 1 / 4 / 2;
  }

  @media only screen and (max-width: 710px) {    
    grid-template-columns: 100%;
    > .error-message {
      grid-area: 4 / 1 / 5 / 2;
      margin: 16px 0 16px 0;
    }
  }
`
