export default async function handler(req, res) {
  // here we return promise to avoid bug (I don't remebmer what kind of bug it was, but the gist is that for category names to work normally, we need to explicitly return promise)
  return new Promise(resolve => {
    fetch(`${
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
            categories {
              data {
                id
                attributes {
                  name
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
            const err = new Error('Error in api/categories.js, .then statement, if (r.status >= 400) condition')
            err.data = errResData
            throw err
          })
        }
        return r.json()
      })
      .then(navItems => {
        res.status(200).json(navItems)
        return resolve()
      })
      .catch(err => {
        res.status(500).json({ message: `Error in api/categories.js, .catch statement, err object: ${err}`})
        return resolve()
      })
  })
}