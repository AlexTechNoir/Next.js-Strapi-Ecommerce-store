import React from 'react'
import { Formik, Form, Field } from 'formik'
import styled from 'styled-components'

export default function Registration() {
  return (
    <DivRegistration className="border-left border-bottom border-right">
      <Formik
        initialValues={{
          email: '',
          name: '',
          password: '',
          passwordConfirm: ''
        }}
        validate={values => {
          const errors = {}
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
          }
          if (values.password !== values.passwordConfirm) {
            errors.passwordConfirm = 'Passwords must coincide.'
          }
          return errors
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          alert(`Your email is: ${data.email}, \nyour name is: ${data.name}, \nyour password is: ${data.password}.`)
          setSubmitting(false)
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form name="Registration">
            <label>
              Email:
              <Field type="email" name="email" required />
              {errors.email ? <div>{errors.email}</div> : null} 
            </label>
            <label>
              Name:
              <Field type="text" name="name" pattern="[A-Za-z]{4,}" title="4 characters or more" required />
            </label>
            <label>
              Password:
              <Field type="password" name="password" minlength="6" required />
            </label>
            <label>
              Confirm password:
              <Field type="password" name="passwordConfirm" minlength="6" required />
              {errors.passwordConfirm ? <div>{errors.passwordConfirm}</div> : null}
            </label>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </DivRegistration>
  )
}

const DivRegistration = styled.div`
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
    > :nth-child(5) {
      margin-top: .5em;
    }
  }
`
