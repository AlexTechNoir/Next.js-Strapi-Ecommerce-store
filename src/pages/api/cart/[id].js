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
    const inStock = req.body.inStock
    const amountInCart = req.body.amountInCart
    const totalPrice = req.body.totalPrice

    data[id].inStock = inStock
    data[id].amountInCart = amountInCart

    if (req.query.type === 'cancel') {
      data[id].isInCart = false
      data[id].totalPrice = 0

      const cart = data.filter(dataItem => 
        dataItem.id === parseInt(id)
      )

      res.status(200).json(cart)
    } else {
      data[id].isInCart = true
      data[id].totalPrice = totalPrice

      const cart = data.filter(dataItem => 
        dataItem.amountInCart > 0
      )

      res.status(200).json(cart)
    }    
  }
}
