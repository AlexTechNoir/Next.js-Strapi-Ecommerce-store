import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function ResetPassword({ hideResetPassword }) {
  return (
    <DivResetPassword className="border-left border-bottom border-right">
      <button className="btn btn-light" onClick={hideResetPassword}>
        <FontAwesomeIcon icon={faArrowLeft} width="1em" /> Go back
      </button>
      <form onSubmit={() => alert('We\'ve sent your new password to you.')}>
        <label>
          Email:
          <input type="email" required />
        </label>
        <button type="submit">
          {" "}Reset Password{" "}
        </button>
      </form>
    </DivResetPassword>
  )
}

const DivResetPassword = styled.div`
  padding: 1em;
  > button {
    margin-bottom: 1em;
  }
  > form {
    display: flex;
    flex-direction: column;
    > label {
      display: flex;
      flex-direction: column;
      > input {
        padding: 0 .2em 0 .2em;
      }
    }
    > button {
      margin-top: .5em;
    }
  }
`
