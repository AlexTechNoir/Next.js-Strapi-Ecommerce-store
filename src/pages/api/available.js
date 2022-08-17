export default async (req, res) => {
  
  const ids = req.query.ids

  const arrOfIds = ids.split(',')
  const filterArrValue = arrOfIds.map(i => ({ id : { eq: i }}))

  // [{id:{eq:"<idNumber>"}},{id:{eq:"<idNumber>"}},{id:{eq:"<idNumber>"}}] ↓
  const filterStringValue = JSON.stringify(filterArrValue).replaceAll('"id"', 'id').replaceAll('"eq"', 'eq')

  // fetch values of available amounts of items in cart based on passed ids of items in cart
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
          query {
            products(filters: { or: ${filterStringValue} }) {
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
    }
  )
    .then(r => {
      if (r.status >= 400) {
        return r.json().then(errResData => {
          const err = new Error('Error in: api/available.js, .then statement, if (r.status >= 400) condition')
          err.data = errResData
          throw err
        })
      }
      return r.json()
    })
    .then(data => {
      const items = data.data.products.data

      res.status(200).json(items)
    })
    .catch(err => res.status(404).json({ message: `Error in api/available.js, .catch statement, status 404, err object: ${err}` }))
}