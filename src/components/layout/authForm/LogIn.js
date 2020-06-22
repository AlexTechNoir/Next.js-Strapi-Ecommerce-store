import React from 'react'
import { Formik, Form, Field } from 'formik'
import styled from 'styled-components'

export default function LogIn({ showResetPassword }) {
  return (
    <DivLogIn className="border-left border-bottom border-right">
      <Formik
        initialValues={{
          email: '',
          password: '',
          isChecked: false
        }}
        validate={values => {
          const errors = {}
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
          }
          return errors
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          alert(`Your email is: ${data.email}, \nyour password is: ${data.password}, \nyou ${data.isChecked ? 'checked' : 'didn\'t check'} checkbox.`)
          setSubmitting(false)
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form name="LogIn">
            <label>
              Email:
              <Field type="email" name="email" required />
              {errors.email ? <div>{errors.email}</div> : null} 
            </label>
            <label>
              Password:
              <Field type="password" name="password" minlength="6" required />
            </label>
            <div className="form-check">
              <label className="form-check-label" htmlFor="autoSizingCheck">
                <Field 
                  type="checkbox" 
                  name="isChecked" 
                  className="form-check-input" 
                  id="autoSizingCheck"
                />
                Remember Me
              </label>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}        
      </Formik>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item badge badge-light" href="/#" onClick={showResetPassword}>
        Reset Password
      </a>
    </DivLogIn>
  )
}

const DivLogIn = styled.div`
  padding: 1em;
  > form {
    display: flex;
    flex-direction: column;
    > label {
      display: flex;
      flex-direction: column;
      user-select: none;
      > input {
        padding: 0 .2em 0 .2em;
      }
      > :nth-child(2) {
        color: red;
      }
    }
    > :nth-child(3) {
      margin-bottom: 1em;
      > label {
        user-select: none;
      }
    }
    > :nth-child(4) {
      margin-top: .5em;
    }
  }
`
