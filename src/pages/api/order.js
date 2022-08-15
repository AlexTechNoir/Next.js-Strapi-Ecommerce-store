const nodemailer = require('nodemailer')

export default async ({ query }, res) => {
  const order = JSON.parse(query.order)

  const customerInfo = order.customerInfo
  const purchase = order.purchase
  const purchasedItems = purchase.purchasedItems

  // We need <availabale> keys for further subtraction, but we don't need to send these keys during mutation (and we can't - no such field in API), so we'll create a second array of objects without them
  const purchasedItemsWithoutAvailableKeys = purchasedItems
    .map(i => { 
      return { ...i } 
    })
    .map(i => {
      delete i.available
      return i
    })

  const filteredStringFromArray = JSON.stringify(purchasedItemsWithoutAvailableKeys)
    .replaceAll('"productId":', 'productId:')
    .replaceAll('"title":', 'title:')
    .replaceAll('"pricePerItem":', 'pricePerItem:')
    .replaceAll('"selectedAmount":', 'selectedAmount:')
    .replaceAll('"priceForAllUnits":', 'priceForAllUnits:')

  // 1st fetch
  await fetch(`${
    process.env.NODE_ENV === "production"
      ? process.env.PROD_CMS_URL
      : process.env.DEV_CMS_URL
    }/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation createOrder {
          createOrder(
            data: {
              orderId: "${order.orderId}",
              customerinfo: {
                fullName: "${customerInfo.fullName}",
                email: "${customerInfo.email}",
                mobilePhone: "${customerInfo.mobilePhone}",
                country: "${customerInfo.country}",
                stateOrCounty: "${customerInfo.stateOrCounty}",
                city: "${customerInfo.city}",
                address: "${customerInfo.address}",
                postcode: "${customerInfo.postcode}",
                deliveryOption: "${customerInfo.deliveryOption}"
              },
              Purchase: {
                currencyCode: "${purchase.currencyCode}",
                purchaseditems: ${filteredStringFromArray},
                priceForAllItems: "${purchase.priceForAllItems}",
                tax: "${purchase.tax}",
                shippingCost: "${purchase.shippingCost}",
                totalPrice: "${purchase.totalPrice}",
                timeOfPurcahse: "${purchase.timeOfPurcahse}",
                paymentMethod: "${purchase.paymentMethod}"
              }
            }
          ) {
            data {
              attributes {
                orderId
                customerinfo {
                  fullName
                  email
                  mobilePhone
                  country
                  stateOrCounty
                  city
                  address
                  postcode
                  deliveryOption
                }
                Purchase {
                  currencyCode
                  purchaseditems {
                    productId
                    title
                    pricePerItem
                    selectedAmount
                    priceForAllUnits
                  }
                  priceForAllItems
                  tax
                  shippingCost
                  totalPrice
                  timeOfPurcahse
                  paymentMethod
                }
              }
            }
          }
        }
      `
    })
  })
    .then(r => {
      if (r.status >= 400) {
        return r.json().then(errResData => {
          const err = new Error('Error in: api/order.js, .then statement, if (r.status >= 400) condition, in createOrder mutation (1st fetch)')
          err.data = errResData
          throw err
        })
      }
      return r.json()
    })
    .then(async () => {

      // create array of objects with id and subtracted amount of items left, to send these keys in mutation query
      const arrWithSubtractedValues = purchasedItems.map(item => {
        const subtractedAmount = item.available - Number(item.selectedAmount)

        // if by any magical reason amount availabale is lesser than amount selected, we fire error response
        if (subtractedAmount < 0) {
          return res.status(404).json({ message: `Error: selected amount is greater than amount in stock; from api/order.js, 1st fetch, second .then statement` })
        }

        return { id: item.productId, available: subtractedAmount }
      })

      // 2nd (set of) fetch(es) in Promise.all, nested in 1st
      await Promise.all(arrWithSubtractedValues.map(async i => {
        return await fetch(`${
          process.env.NODE_ENV === "production"
            ? process.env.PROD_CMS_URL
            : process.env.DEV_CMS_URL
          }/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation updateProduct {
                updateProduct(id: "${i.id}", data: { available: ${i.available} }) {
                  data {
                    id
                    attributes {
                      available
                    }
                  }
                }
              }
            `
          })
        })
          .then(r => {
            if (r.status >= 400) {
              return r.json().then(errResData => {
                const err = new Error('Error in: api/order.js, .then statement, if (r.status >= 400) condition, in updateProduct mutation (2nd fetch)')
                err.data = errResData
                throw err
              })
            }
            return r.json()
          })
          .then(data => data)
          .catch(err => console.log('Error in: api/order.js, .catch statement, 2nd (set of) fetch(es), err object:', err))
        })
      )
        .then(async () => {
          
          // create nodemailer transporter
          const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.NODEMAILER_SENDER_EMAIL,
              pass: process.env.NODEMAILER_SENDER_EMAIL_PASSWORD
            },
            // for self-signed certificate, otherwise email won't be sent
            tls: {
              rejectUnauthorized: false
            }
          })

          transporter.verify(function (error, success) {
            if (error) {
              console.log('Error in api/order.js, Promise.all .then statement, transporter.verify, error obj:', error)
            } else {
              console.log('Server is ready to take our messages')
            }
          })

          // send email
          const info = await transporter.sendMail({
            from: `"Alimazon" ${process.env.NODEMAILER_SENDER_EMAIL}`,
            to: customerInfo.email,
            subject: 'Your Alimazon order',
            html: `
              <h2>This is a fake email order test. If you received this email, it means that nodemailer works 🙂</h2>
              <h1>Hello, ${customerInfo.fullName}! 👋</h1>
              <h2>
                You've made a purchase at: 
                <span style="color: #2e6c80;">
                  ${purchase.timeOfPurcahse.replace('T', ', ').replace('Z', '')}
                </span>
              </h2>
              <h2>Your order number is: <span style="color: #2e6c80;">${order.orderId}</span></h2>                 
              <p>Your purchased items:</p>
              <table style="border-collapse: collapse;" border="1">
                <thead>
                  <tr>
                    <td>Title</td>
                    <td>Amount</td>
                    <td>Price</td>
                  </tr>
                </thead>
                <tbody>
                  ${purchasedItems.map(i => {
                    return `
                      <tr>
                        <td>${i.title}</td>
                        <td>${i.selectedAmount}</td>
                        <td>${purchase.currency} ${i.priceForAllUnits}</td>
                      </tr>
                    `
                  }).join('')}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td></td>
                    <td>${purchase.currency} ${purchase.tax}</td>
                  </tr>
                  <tr>
                    <td>Shipping cost</td>
                    <td></td>
                    <td>${purchase.currency} ${purchase.shippingCost}</td>
                  </tr>
                  <tr>
                    <td><b>Total</b></td>
                    <td></td>
                    <td><b>${purchase.currency} ${purchase.totalPrice}</b></td>
                  </tr>
                </tbody>
              </table>
              <p>
                Your purchase will be delivered by <b>${customerInfo.deliveryOption}</b> to following address: <b>${customerInfo.country}, ${customerInfo.stateOrCounty}, ${customerInfo.city}, ${customerInfo.address}, ${customerInfo.postcode}</b>, within <b>${customerInfo.country === 'US' ? 10 : 30} days</b> after the date of purchase.
              </p>
              <p><strong>If you haven't purchased anything on Alimazon, please, ignore this letter!</strong></p>
            `
          })

          // I'll left this log here just in case
          console.log('nodemailer <info> obj:', info)

          return res.status(200).json({ id: order.orderId })
        })
        .catch(err => res.status(404).json({ message: `Error in: api/order.js, Promise.all, .catch statement, res.status(404), err object: ${err}` }))
    })
    .catch(err => res.status(404).json({ message: `Error from api/order.js, in createOrder mutation (1st fetch), .catch statement, res.status(404), err object: ${err}` }))
}
