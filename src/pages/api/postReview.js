import DOMPurify from 'isomorphic-dompurify'

export default async (req, res) => {
  const query = req.query

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
        query Review($productId: String, $email: String) {
          reviews(filters: { and: [{ productId: { eq: $productId }}, { email: { eq: $email }}]}) {
            data {
              attributes {
                productId
                email
              }
            }
          }
        }
      `,
      variables: {
        productId: productId,
        email: email
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
    .then(async data => {
      const isEmailAlreadyPersent = data.data.reviews.data.length !== 0

      if (isEmailAlreadyPersent) {
        res.statusMessage = 'The review with such email has already been published. Please, choose another email.'
        res.status(400).end()
      } else {
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
      }
    })
    .catch(err => res.status(404).json({ message: `Error: ${err}` }))
}