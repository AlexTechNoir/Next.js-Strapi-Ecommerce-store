import { data } from '../../../data'

export default (req, res) => {
  const page = req.query.params[0]
  const limit = req.query.params[1]

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const result = data
    .filter(dataItem => dataItem.category === "Mobile Phones")
    .slice(startIndex, endIndex)

  res.status(200).json(result)
}
