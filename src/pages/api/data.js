// import { data } from '../../data'

export default async (req, res) => {
  const id = parseInt(req.query.id)
  const value = req.query.value.toLowerCase().trim()

  if (req.query.category === 'search') {
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
            products(filters: { title: { containsi: "${value}" }}) {
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
                }
              }
            }
          }
        `
      })
    })
      .then(r => r.json())
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => res.status(404).json({ message: `Error: ${err}`}))
    
  } else if (req.query.category === 'object') {
    const result = data.find(dataItem => dataItem.id === id)
    res.status(200).json(result)
  } else if (req.method === 'PATCH') {
    let reviewedItem = data[id].reviews.find(i => i.id === id)
    if (reviewedItem !== undefined) {
      reviewedItem = req.body
    }
    data[id].reviews.push(req.body)
    const itemReview = {
      user: req.body.user,
      review: req.body.review
    }
    res.status(200).json(itemReview)
  } else if (req.method === 'DELETE') {
    const reviewedItem = data[id].reviews.find(i => i.id === id)
    reviewedItem.filter(i => i.user !== req.query.user)
  } else {
    res.status(200).json({ name: 'John Doe' })
  }
}
