import DOMPurify from 'isomorphic-dompurify'

export default async (req, res) => {
  const query = req.query

  if (query.type === 'search') {

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
    
  } else if (query.type === 'postReview') {

    const productId = query.productId
    const name = DOMPurify.sanitize(query.name.trim())
    const email = DOMPurify.sanitize(query.email.trim().toLowerCase())
    const reviewText = DOMPurify.sanitize(query.reviewText.trim())

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
          mutation postReview($productId: String, $name: String, $email: String, $reviewText: String) {
            createReview(data: { productId: $productId, name: $name, email: $email, reviewText: $reviewText }) {
              data {
                id
                attributes {
                  productId
                  name
                  email
                  reviewText
                  createdAt
                }
              }
            }
          }
        `,
        variables: {
          productId: productId,
          name: name,
          email: email,
          reviewText: reviewText
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
    
  } else if (query.type === 'getReviews') {

    const productId = query.productId

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
          query GetReviewsOfproduct($productId: String) {
            reviews(filters: { productId: { eq: $productId }}) {
              data {
                id
                attributes {
                  name
                  reviewText
                }
              }
            }
          }
        `,
        variables: {
          productId: productId
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

  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}
