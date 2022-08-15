export default async ({ query: { ids }}, res) => {

  const arrOfIds = ids.split(',')
  const filterArrValue = arrOfIds.map(i => ({ id : { eq: i }}))

  // [{id:{eq:"<idNumber>"}},{id:{eq:"<idNumber>"}},{id:{eq:"<idNumber>"}}] - for query ↓
  const filterStringValue = JSON.stringify(filterArrValue).replaceAll('"id"', 'id').replaceAll('"eq"', 'eq')

  // fetch items for cart nased on passed ids
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
                title
                company
                price
                available
                image {
                  data {
                    id
                    attributes {
                      name
                      alternativeText
                      url
                    }
                  }
                }
                discount {
                  data {
                    attributes {
                      discountMultiplier
                    }
                  }
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
          const err = new Error('Error')
          err.data = errResData
          throw err
        })
      }
      return r.json()
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: `Error: ${err}` }))
}