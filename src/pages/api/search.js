import DOMPurify from 'isomorphic-dompurify'

export default async (req, res) => {
  const query = req.query
  
  const value = DOMPurify.sanitize(query.value.toLowerCase().trim())

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
        query SearchProduct($value: String) {
          products(filters: { title: { containsi: $value }}) {
            data {
              id
              attributes {
                title
                price
                image {
                  data {
                    attributes {
                      name
                      alternativeText
                      url
                    }
                  }
                }
                category {
                  data {
                    attributes {
                      name
                    }
                  }
                }
                discount {
                  data {
                    attributes {
                      discountPercent
                      discountMultiplier
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        value: value
      }
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
