import styled from 'styled-components'

export default function Form({ 
  formik, 
  isFormSubmitted, 
  territorialDivisionType, 
  postCodePattern, 
  estimateShippingCost,
  setIsFormSubmitted 
}) {

  const handleFormFields = e => {

    // !WARNING! In this function we store sensitive user data in localStorage which is a dangerous security practice (same thing for client-created cookies)! We do this to implement saving entered data in form after a page reload. I decided to leave it for the sake of learning and a good DX of mine 🙂 In real-life case we would have a trade-off between a safe security practice (not to store anything sensitive that may be accessed with JavaScript) and satisfying UX (saving user from annoyance of entering data again after, say, accidental page reload (this might decrease cart abandonment and increase chance of convertion)). The best solution would be storing data on server, when data is tied to user account, which requires authentication that is not implemented is this project.

    const inputName = e.target.name
    const inputValue = e.target.value

    if (localStorage.getItem('order') === null) {

      // if it's the first time user enters data in form
      localStorage.setItem('order', JSON.stringify({}))
      const order = JSON.parse(localStorage.order)
      order[inputName] = inputValue
      localStorage.setItem('order', JSON.stringify(order))

    } else {

      const order = JSON.parse(localStorage.order)

      if (inputValue === '') {
        delete order[inputName]

        if (order === {}) {
          localStorage.removeItem('order')
        }
      } else {
        order[inputName] = inputValue
      }

      localStorage.setItem('order', JSON.stringify(order))
    }

    if (inputName === 'delivery') {

      formik.values.delivery = inputValue
      // We could put this function in useEffect with formik.values.delivery as dependency, but it is not triggering 🤷 (see more in comment in pages/checkout.js in second useEffect)
      estimateShippingCost()

    } else {
      formik.handleChange(e)
    }
  }

  const editShippingAddress = () => {
    localStorage.setItem('isFormSubmitted', JSON.stringify('no'))
    setIsFormSubmitted(false)

    const form = document.getElementById('form')
    form.scrollIntoView()
  }

  return (
    <OrderDetailsForm className="order-details" id="form" onSubmit={formik.handleSubmit}>
      {
        !isFormSubmitted
        ? (
          <>
            <fieldset className="shipping-address">
              <legend>Shipping address</legend>
              
              <label htmlFor="full-name">Full Name</label>
              <input 
                type="text" 
                id="full-name" 
                name="fullName" 
                required 
                defaultValue={formik.values.fullName} 
                onChange={e => handleFormFields(e)}
              />

              <label htmlFor="country">Country</label>
              <select 
                id="country" 
                name="country" 
                required 
                defaultValue={formik.values.country} 
                onChange={e => handleFormFields(e)}
              >
                <option value="">Select your country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
              </select>

              <label htmlFor="address">Address</label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                maxLength="95"
                required 
                defaultValue={formik.values.address} 
                onChange={e => handleFormFields(e)} 
              />

              <label htmlFor="city">City</label>
              <input 
                type="text" 
                id="city" 
                name="city" 
                maxLength="85"
                required 
                defaultValue={formik.values.city} 
                onChange={e => handleFormFields(e)} 
              />
              
              <div className="state-and-postcode">
                <div className="state-or-county">
                  <label htmlFor="state-or-county">{territorialDivisionType}</label>
                  <input 
                    type="text" 
                    id="state-or-county" 
                    name="stateOrCounty" 
                    maxLength="255"
                    required 
                    defaultValue={formik.values.stateOrCounty}
                    onChange={e => handleFormFields(e)}
                  />
                </div>

                <div className="postcode">
                  <label htmlFor="postcode">Postcode</label>
                  <input 
                    type="text" 
                    id="postcode" 
                    name="postcode" 
                    pattern={postCodePattern} 
                    title="Postcode should match your country"
                    required 
                    defaultValue={formik.values.postcode}
                    onChange={e => handleFormFields(e)}
                  />
                </div>
              </div>        
              
              <label htmlFor="email">Email (for us to send a receipt)</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                maxLength="62"
                required 
                defaultValue={formik.values.email} 
                onChange={e => handleFormFields(e)} 
              />

              <label htmlFor="mobile-phone">Mobile phone (to contact you during delivery day)</label>
              <input 
                type="tel" 
                id="mobile-phone" 
                name="mobilePhone" 
                maxLength="30"
                required
                defaultValue={formik.values.mobilePhone}
                onChange={e => handleFormFields(e)}
              />
            </fieldset>

            <fieldset className="delivery-option">
              <legend>Delivery option</legend>

              <input 
                type="radio" 
                id="alimazon-courier" 
                name="delivery" 
                value="Alimazon courier" 
                onChange={e => handleFormFields(e)}
                required
              />
              <label htmlFor="alimazon-courier">Alimazon courier (free)</label>
              <br />

              <input 
                type="radio" 
                id="delivery-company" 
                name="delivery" 
                value="Delivery company" 
                onChange={e => handleFormFields(e)}
              />
              <label htmlFor="delivery-company">Delivery company (extra charges may apply)</label>
            </fieldset>

            <button type="submit" className="btn btn-primary">Confirm order details</button>
          </>
        ) : (
          <>
            <h3>Customer:</h3>
            <div className="customer-data">
              {formik.values.fullName}, {formik.values.email}, {formik.values.mobilePhone}
            </div>

            <h3>Shipping address:</h3>
            <div className="shipping-address-data">
              {formik.values.country}, {formik.values.stateOrCounty}, {formik.values.city}, {formik.values.address}, {formik.values.postcode}
            </div>

            <h3>Delivery:</h3>
            <div className="delivery-option-data">
              Will be delivered by <b>{formik.values.delivery}</b> within <b>{formik.values.country === 'US' ? 10 : 30} days</b> after the date of purchase
            </div>

            <button type="button" className="btn btn-warning edit-button" onClick={editShippingAddress}>
              Edit order details
            </button>
          </>
        )
      }
    </OrderDetailsForm>
  )
}

const OrderDetailsForm = styled.form`
  grid-area: 2 / 1 / 3 / 2;
  background-color: #f2f2f2;
  width: 100%;
  border-radius: 3px;
  padding: 16px;
  border: 1px solid lightgrey;
  align-self: start;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  > .shipping-address {
    > h3 {
      margin-bottom: 16px;
    }
    > input, select {
      width: 100%;
      margin-bottom: 20px;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
    > label {
      margin-bottom: 10px;
      display: block;
    }
    > .state-and-postcode {
      display: flex;
      > .state-or-county, 
      > .postcode {
        display: flex;
        flex-direction: column;
        > input {
          width: 100%;
          margin-bottom: 20px;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }
        > label {
          margin-bottom: 10px;
          display: block;
        }
      }
      > .state-or-county {
        padding: 0 16px 0 0;

      }
      > .postcode {
        padding: 0 16px;
      }
    }
  }
  > .delivery-option {
    margin-bottom: 16px;
    > label {
      margin-left: 12px;
    }
  } 
  > .customer-data, > .shipping-address-data, > .delivery-option-data {
    margin-bottom: 16px;
  }
  > .edit-button {
    align-self: flex-start;
  }

  @media only screen and (max-width: 710px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`
