import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export default function PublishedReviews(props) {
  const {
    id, 
    reviews, 
    Editor,
    editorState, 
    setEditorState, 
    setReviewedItems, 
    draftToHtml, 
    convertToRaw
  } = props

  const date = new Date().toISOString().slice(0, 10)

  const [ isPublishedEditorReadOnly, setIsPublishedEditorReadOnly ] = useState(true)
  const [ isLikePressed, setIsLikePressed ] = useState(false)
  const [ isDislikePressed, setIsDislikePressed ] = useState(false)

  const editReview = () => {
    setIsPublishedEditorReadOnly(false)
  }

  const saveChanges = () => {
    if (editorState.getCurrentContent().hasText()) {
      setIsPublishedEditorReadOnly(true)

      const items = JSON.parse(localStorage.reviewedItems)
      const item = items.find(i => i.id === id)
      const userReview = item.reviews.find(i => i.user === "UserName")
      const plainTextMarkup = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      )

      if (userReview.review !== plainTextMarkup) {
        fetch(
          `${
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_PROD_HOST
              : process.env.NEXT_PUBLIC_DEV_HOST
          }/api/data?&id=${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
              user: "UserName",
              review: plainTextMarkup
            })
          }
        )
          .then(r => {
            if (r.status >= 400) {
              return r.then(errResData => {
                const err = new Error("Error.")
                err.data = errResData
                throw err
              })
            }
          })
          .then(() => {
            userReview.review = plainTextMarkup
            localStorage.setItem("reviewedItems", JSON.stringify(items))
            setReviewedItems(JSON.parse(localStorage.reviewedItems))
          })
      }
    }
  }

  const toggleLikeDislike = e => {
    if (e.currentTarget.id === 'like') {
      if (!isLikePressed) {
        setIsLikePressed(true)
        setIsDislikePressed(false)
      } else {
        setIsLikePressed(false)
      }
    } else if (e.currentTarget.id === 'dislike') {
      if (!isDislikePressed) {
        setIsDislikePressed(true)
        setIsLikePressed(false)
      } else {
        setIsDislikePressed(false)
      }
    }
  }

  const deleteReview = () => {
    fetch(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_PROD_HOST
          : process.env.NEXT_PUBLIC_DEV_HOST
      }/api/data?id=${id}&user=UserName`,
      {
        method: "DELETE"
      }
    ).then(() => {
      let items = JSON.parse(localStorage.reviewedItems)
      const item = items.find(i => i.id === id)
      const filteredReviews = item.reviews.filter(i => i.user !== "UserName")
      item.reviews = filteredReviews

      if (item.reviews.length < 1) {
        const filteredItems = items.filter(i => i.id !== id)
        items = filteredItems
      }

      localStorage.setItem("reviewedItems", JSON.stringify(items))
      setReviewedItems(JSON.parse(localStorage.reviewedItems))
    })
  }

  return (
    <div>
      {
        reviews.map(review => 
          <div className="review">
            <div>
              <div>
                <img src="/img/defaultAvatar.webp" alt="avatar" height="50" width="50" />
                <span>{review.user} {date}</span>
                <span onClick={() => editReview()}>
                  <FontAwesomeIcon icon={faEdit} width="1em" />
                </span>
              </div>
              <button 
                type="button" 
                className="close text-danger" 
                aria-label="Close" 
                onClick={() => deleteReview()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <Editor
              readOnly={isPublishedEditorReadOnly}
              toolbarHidden={isPublishedEditorReadOnly}
              editorState={editorState}
              toolbarClassName="toolbar"
              wrapperClassName="wrapper"
              editorClassName="editor"
              onEditorStateChange={editorState => setEditorState(editorState)}
            />
            <div>
              {
                isPublishedEditorReadOnly
                ? (
                  <React.Fragment>
                    <button 
                      id="like"
                      type="button"
                      className={isLikePressed 
                        ? 'btn btn-success mt-2 mr-2' 
                        : 'btn btn-outline-success mt-2 mr-2'}
                      onClick={e => toggleLikeDislike(e)}
                    >
                      Agree <FontAwesomeIcon icon={faThumbsUp} width="1em" />
                    </button>
                    <button 
                      id="dislike"
                      type="button"
                      className={isDislikePressed 
                        ? 'btn btn-danger mt-2' 
                        : 'btn btn-outline-danger mt-2'}
                      onClick={e => toggleLikeDislike(e)}
                    >
                      Disagree <FontAwesomeIcon icon={faThumbsDown} width="1em" />
                    </button>
                  </React.Fragment>
                ) : (
                  <button className="btn btn-primary mt-2" onClick={() => saveChanges()}>
                    Save Changes
                  </button>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  )
}
