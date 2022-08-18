import DOMPurify from 'isomorphic-dompurify'

export default async (req, res) => {

  const query = JSON.parse(req.query.data)

  const name = DOMPurify.sanitize(query.name.trim())
  const email = DOMPurify.sanitize(query.email.trim())
  const topic = DOMPurify.sanitize(query.topic.trim())
  const message = DOMPurify.sanitize(query.message.trim())

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
        mutation createMessage {
          createMessage(data: { name: "${name}", email: "${email}", topic: "${topic}", message: "${message}" }) {
            data {
              attributes {
                name
                email
                topic
                message
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
          const err = new Error('Error in: api/contact.js, .then statement, if (r.status >= 400) condition')
          err.data = errResData
          throw err
        })
      }
      return r.json()
    })
    .then(data => {
      if (data) {
        res.status(200).json({ message: 'SUCCESS'})
      }
    })
    .catch(err => res.status(404).json({ message: `Error in api/contact.js, .catch statement, status 404, err object: ${err}` }))
}