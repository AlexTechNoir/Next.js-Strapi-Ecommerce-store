import { data } from '../../../data'

export default (req, res) => {
  const {
    query: { id },
    method
  } = req

  if (method === 'GET') {
    const cart = data.filter(dataItem => 
      dataItem.amountInCart > 0
    )
    res.status(200).json(cart)
  } else if (method === 'PATCH') {
    if (req.query.type === 'cancel') {
      const amountInCart = req.body.amountInCart

      data[id].isInCart = false
      data[id].amountInCart = parseInt(amountInCart)
      data[id].totalPrice = 0

      const cart = data.filter(dataItem => 
        dataItem.id === parseInt(id)
      )

      res.status(200).json(cart)
    } else if (req.query.type === 'editInCart') {
      const amountInCart = req.body.amountInCart
      const totalPrice = req.body.totalPrice

      data[id].isInCart = true
      data[id].amountInCart = parseInt(amountInCart)
      data[id].totalPrice = totalPrice

      const cartItem = data.filter(dataItem => 
        dataItem.id === parseInt(id)
      )

      res.status(200).json(cartItem)
    } else if (req.query.type === 'delete') {
      data[id].isInCart = false
      data[id].amountInCart = 0
      data[id].totalPrice = 0
      
      const cartItem = data.filter(dataItem => 
        dataItem.id === parseInt(id)
      )

      res.status(200).json(cartItem)
    } else {
      const amountInCart = req.body.amountInCart
      const totalPrice = req.body.totalPrice

      data[id].isInCart = true
      data[id].amountInCart = parseInt(amountInCart)
      data[id].totalPrice = totalPrice

      const cartItem = data.filter(dataItem => 
        dataItem.id === parseInt(id)
      )

      res.status(200).json(cartItem)
    }    
  }
}
