export default async function handler(req, res) {
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
    .then(r => r.json())
    .then(navItems => res.status(200).json(navItems))
    .catch(err => res.status(500).json({ message: `Error: ${err}`}))
}