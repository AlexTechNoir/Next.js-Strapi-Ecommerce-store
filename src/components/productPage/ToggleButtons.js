import styled from 'styled-components'

export default function ToggleButtons({ toggleTabs, isReviewsTabVisible }) {
  return (
    <ToggleButtonsDiv>
      <button
        type="button"
        name="reviews"
        className={`btn ${isReviewsTabVisible ? "btn-light" : "btn-white"} border-right border-top`}
        onClick={toggleTabs}
      >
        Reviews
      </button>
      <button
        type="button"
        name="comments"
        className={`btn ${isReviewsTabVisible ? "btn-white" : "btn-light"} border-left border-top`}
        onClick={toggleTabs}
      >
        Comments
      </button>
    </ToggleButtonsDiv>
  )
}

const ToggleButtonsDiv = styled.div`
  align-self: stretch;
  > button {
    width: 50%;
    margin-top: 2.5em;
    padding: .5em 2em .5em 2em;
    box-shadow: none;
    border-radius: 0;
  }

  @media only screen and (min-width: 850px) {
    grid-area: 4 / 1 / 5 / 3;
  }
`
