export default function ToggleButtons({ toggleTabs, isReviewsTabVisible }) {
  return (
    <div>
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
    </div>
  )
}
