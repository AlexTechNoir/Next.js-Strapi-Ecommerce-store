import Head from 'next/head'
import styled from 'styled-components'
import { useState } from 'react'

export default function ContactUs() { 

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ topic, setTopic ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ isSendButtonDisabled, setIsSendButtonDisabled ] = useState(false)
  const [ isMessageSent, setIsMessageSent ] = useState(false)

  const handleFormFields = e => {

    const fieldId = e.target.id
    const fieldValue = e.target.value

    switch (fieldId) {
      case 'name':
        setName(fieldValue)
        break
      case 'email':
        setEmail(fieldValue)
        break
      case 'topic':
        setTopic(fieldValue)
        break
      case 'message':
        setMessage(fieldValue)
        break
      default:
        return null
    }
  }

  const handleSubmit = e => {

    setIsSendButtonDisabled(true)
    
    e.preventDefault()

    const data = { name, email, topic, message }

    fetch(`api/contact?data=${encodeURIComponent(JSON.stringify(data))}`)
      .then(r => {
        if (r.status >= 400) {
          return r.json().then(errResData => {
            const err = new Error('Error in pages/contact-us.js, .then statement, if (r.status >= 400) condition')
            err.data = errResData
            throw err
          })
        }
        return r.json()
      })
      .then(data => {
        if (data.message && data.message === 'SUCCESS') {
          setIsMessageSent(true)
        }
      })
      .catch(err => console.error('Error in pages/contact-us.js, .catch statement, err object:', err))
  }

  return (
    <>
      <Head>
        <title>Contact Us! - Alimazon</title>
        <meta name="description" content="Write to us!" />
      </Head>
      
      {
        isMessageSent
        ? (
          <SuccessMessage>
            <h1>Your message has been sent! ✔️</h1>
            <h2>We will contact you as soon as possible! 📧</h2>
          </SuccessMessage>
        ) : (
          <DivContactForm>
            <h1>Contact Us!</h1>        
            <form onSubmit={e => handleSubmit(e)}>

              <div className="form-group">
                <label htmlFor="name">Your name:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  required 
                  defaultValue={name} 
                  onChange={e => handleFormFields(e)} 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your email:</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  required 
                  defaultValue={email} 
                  onChange={e => handleFormFields(e)} 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Select topic:</label>
                <select 
                  name="topic" 
                  className="custom-select" 
                  id="topic" 
                  required 
                  defaultValue={topic} 
                  onChange={e => handleFormFields(e)}
                >
                  <option value="" disabled>-</option>
                  <option value="I want a refund">I want a refund</option>
                  <option value="I didn't receive order info email">I didn't receive order info email</option>
                  <option value="I can't purchase the product(s)">I can't purchase the product(s)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your message:</label>
                <textarea 
                  className="form-control" 
                  id="message" 
                  rows="3" 
                  required 
                  defaultValue={message} 
                  onChange={e => handleFormFields(e)}
                ></textarea>
              </div>

              <input className="btn btn-primary" type="submit" value="Submit" disabled={isSendButtonDisabled}></input>
            </form>
          </DivContactForm>
        )
      }      
    </>
  )
}

const SuccessMessage = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  background: #f8f9fa;
  border-radius: 5px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`

const DivContactForm = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  border-radius: 5px;
  padding: 2.5em;
`
