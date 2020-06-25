import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import PublishedReviews from './reviews/PublishedReviews'

export default function Reviews({ dataItem }) {
  const { id } = dataItem

  const [ editorState, setEditorState ] = useState(EditorState.createEmpty())
  const [ reviewedItems, setReviewedItems ] = useState([])
  const [ reviews, setReviews ] = useState([])
  const [ isEditorReadOnly, setIsEditorwReadOnly ] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('reviewedItems') === null) {
      localStorage.setItem('reviewedItems', JSON.stringify([]))
      setReviewedItems(JSON.parse(localStorage.reviewedItems))
    } else {
      setReviewedItems(JSON.parse(localStorage.reviewedItems))
    }
  }, [])

  useEffect(() => {
    const reviewedItem = reviewedItems.find(i => i.id === id)
    if (reviewedItem !== undefined) {
      const reviewList = reviewedItem.reviews
      setReviews(reviewList)
      const userReview = reviewList.find(i => i.user === 'UserName')
      const review = EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(userReview.review)))
      setEditorState(review)
    } else {
      setReviews([])
    }
  }, [reviewedItems])

  const postReview = () => {
    if (editorState.getCurrentContent().hasText()) {
      setIsEditorwReadOnly(true)

      const plainTextMarkup = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      )

      fetch(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_PROD_HOST
            : process.env.NEXT_PUBLIC_DEV_HOST
        }/api/data?id=${id}`,
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
          return r.json()
        })
        .then(r => {
          const items = JSON.parse(localStorage.reviewedItems)
          const item = items.find(i => i.id === id)
          if (item === undefined) {
            items.push({
              id: id,
              reviews: []
            })
            const newItem = items.find(i => i.id === id)
            newItem.reviews.push(r)
            localStorage.setItem("reviewedItems", JSON.stringify(items))
            setReviewedItems(JSON.parse(localStorage.reviewedItems))
          } else {
            item.reviews.push(r)
            localStorage.setItem("reviewedItems", JSON.stringify(items))
            setReviewedItems(JSON.parse(localStorage.reviewedItems))
          }
        })

      setIsEditorwReadOnly(false)
    }
  }

  return (    
    <React.Fragment>
      {
        reviews === undefined || reviews.length < 1
        ? (
          <div>
            <div>
              <Editor
                readOnly={isEditorReadOnly}
                toolbarHidden={isEditorReadOnly}
                toolbarClassName="toolbar"
                wrapperClassName="wrapper"
                editorClassName="editor"
                onEditorStateChange={editorState => setEditorState(editorState)}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                  colorPicker: { popupClassName: 'colorPickerPopup' },
                  link: { popupClassName: 'linkPopup' },
                  emoji: { popupClassName: 'emojiPopup' },
                  embedded: { popupClassName: 'embeddedPopup' },
                  image: { popupClassName: 'imagePopup' }
                }}
              />
            </div>
            <button className="post-button btn btn-primary" onClick={() => postReview()}>
              Post Review
            </button>
            <h4 className="note">No reviews so far. Be the first!</h4>
          </div>
        ) : (
          <PublishedReviews 
            id={id}
            reviews={reviews}
            Editor={Editor}
            editorState={editorState}
            setEditorState={setEditorState}
            setReviewedItems={setReviewedItems}
            draftToHtml={draftToHtml}
            convertToRaw={convertToRaw}
          />
        )          
      }
    </React.Fragment>    
  )
}
