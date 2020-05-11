import { data, mobile_phones, laptops, tablets } from '../../data'

export default (req, res) => {
  const page = req.query.page
  const limit = req.query.limit

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  if (req.query.category === 'mobile_phones') {
    const result = mobile_phones.slice(startIndex, endIndex)
    res.status(200).json(result)
  } else if (req.query.category === 'laptops') {
    const result = laptops.slice(startIndex, endIndex)
    res.status(200).json(result)
  } else if (req.query.category === 'tablets') {
    const result = tablets.slice(startIndex, endIndex)
    res.status(200).json(result)
  } else if (req.query.category === 'best_offers') {
    const result = data.filter(dataItem => dataItem.price === 250)
    res.status(200).json(result)
  } else if (req.query.category === 'search') {
    const searchResults = data.filter(dataItem =>
      dataItem.title
        .toLowerCase()
        .includes(req.query.value.toLowerCase().trim())
    )
    res.status(200).json(searchResults)
  } else {
    res.status(200).json(data)
  }
}
