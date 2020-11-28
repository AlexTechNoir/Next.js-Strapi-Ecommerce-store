import { useEffect } from 'react'

export default function PayPalCheckoutButton({ totalPrice, clearCart }) {
  useEffect(() => { 
    paypal.Buttons({
      env: 'sandbox',
      client: {
        sandbox: 'Adrrm9v8CMsKKDnZ4csRq6wdZ245iCGET2k9RiE78vTgtVewM1Cl6MDcwonotjEgmv27vc4733phc21X',
        production: 'xxxxxxxxx'
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            description: 'desc',
            amount: {
              value: totalPrice,
              currency: 'EUR'
            }
          }]
        })
      },
      commit: true,
      onApprove: (data, actions) => actions.order.capture().then(() => {
        alert('Payment successful!')
        clearCart()
      }),
      onCancel: data => console.log('The payment was cancelled!'),
      onError: err => console.error(err),
      style: {
        layout:  'vertical',
        color:  'gold',
        shape:  'pill',
        size: 'responsive',
        label:  'pay',
        height: 40
      }
    }).render('#paypalCheckoutButton')
  }, [])

  return (
    <div>
      <div id="paypalCheckoutButton"></div>
    </div>
  )
}
