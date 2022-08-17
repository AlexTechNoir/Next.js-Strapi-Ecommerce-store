import { useState } from 'react'
import dynamic from 'next/dynamic'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Reviews({ id, reviewList }) {

  const [ isEditorReadOnly, setIsEditorReadOnly ] = useState(false)
  const [ sameEmailError, setSameEmailError ] = useState(false)
  const [ reviews, setReviews ] = useState(reviewList)

  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    onSubmit: async (values, { resetForm }) => {

      setIsEditorReadOnly(true)

      // fetch api route with attached data
      await fetch(`/api/postReview?productId=${id}&name=${values.name}&email=${values.email}&reviewText=${encodeURIComponent(values.message)}`)
        .then(res => {

          if (res.status >= 400) {
            if (res.status === 400) {

              // api will send status 400 if email is already present, then we trigger error
              setSameEmailError(res.statusText)
              const err = new Error(res.statustext)
              setIsEditorReadOnly(false)

              throw err

            } else if (res.status > 400) {

              setSameEmailError(false)
              const err = new Error('Error in components/productPage/Reviews.js, formik onSubmit, fetch, .then statement, if (res.status > 400) condition')  
              setIsEditorReadOnly(false)
  
              throw err
            }
          }
          return res.json()
        })
        .then(data => {

          resetForm()
          setEditorState(EditorState.push(editorState, ContentState.createFromText('')))

          setSameEmailError(false)
          
          const publishedReview = data.data.createReview.data 
          // for now we're pushing review obj into array with others, after page reload they will be fetched altogether
          reviewList.push(publishedReview)
          setReviews(reviewList)
    
          setIsEditorReadOnly(false)

          const headingElement = document.getElementById('heading')
          headingElement.scrollIntoView({ behavior: 'smooth' })
        })
        .catch(err => console.error('Error in components/productPage/Reviews.js, formik onSubmit() function, .catch statement, err object:', err))
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(1).max(20),
      email: Yup.string().min(6).max(50),
      message: Yup.string().min(1).max(100).required('Required')
    })
  })  

  const value = formik.values.message
  
  const prepareDraft = value => {

    const draft = htmlToDraft(value)
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks)
    const editorState = EditorState.createWithContent(contentState)

    return editorState
  }

  const setFieldValue = val => formik.setFieldValue('message', val)

  const [ editorState, setEditorState ] = useState(value ? prepareDraft(value) : EditorState.createEmpty())

  const onEditorStateChange = editorState => {

    const forFormik = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    )
    setFieldValue(forFormik)
    setEditorState(editorState)
  }

  return (
    <ReviewsDiv>
      <div className="heading" id="heading">
        {
          reviews.length === 0
          ? 'No reviews so far. Be the first!'
          : 'Reviews'
        }
      </div>
      <div className="reviews">
        {
          reviews
            .sort((a, b) => (
              // sort by date, newest first ↓
              new Date(b.attributes.createdAt).getTime() - new Date(a.attributes.createdAt).getTime()
            ))
            .map(review => (
              <div className="review" key={review.id}>
                <div>
                  Reviewed at <b>{review.attributes.createdAt.slice(0, 10)}</b> by <b>{review.attributes.name}</b>:
                </div>
                <div dangerouslySetInnerHTML={{__html: review.attributes.reviewText}} className="review-text"></div>
              </div>
            ))
        }
      </div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
          </div>
          <input 
            type="text" 
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-default" 
            pattern="[A-Za-z ]{1,32}"
            title="1 to 32 letters, no special symbols, except space"
            minLength="1"
            name="name"
            id="name" 
            required
            className="form-control" 
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        {formik.errors.name && <h1 className="feedback-msgs">{formik.errors.name}</h1>}
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">E-mail</span>
          </div>
          <input 
            type="email" 
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-default" 
            minLength="3"
            name="email"
            id="email"
            required
            className="form-control" 
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        {formik.errors.email && <h1 className="feedback-msgs">{formik.errors.email}</h1>}
        <div className="editor-top-wrapper">        
          <Editor
            editorState={editorState}
            readOnly={isEditorReadOnly}
            toolbarHidden={isEditorReadOnly}
            toolbarClassName="toolbar"
            wrapperClassName="wrapper"
            editorClassName="editor"
            onEditorStateChange={onEditorStateChange}
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
        {formik.errors.message && <div className="feedback-msgs">{formik.errors.message}</div>}
        {
          sameEmailError 
          ? <div className="feedback-msgs">{sameEmailError}</div> 
          : null
        }
        <button type="submit" className="post-button btn btn-primary" disabled={isEditorReadOnly}>
          Post Review
        </button>
      </form>
    </ReviewsDiv>
  )
}

const ReviewsDiv = styled.div`
  grid-area: 4 / 1 / 5 / 3;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  color: #212529;
  width: 100%;
  padding-top: 2em;
  margin-top: 16px;
  margin-bottom: 32px;
  > .heading {
    align-self: stretch;
    padding: 0 2em .5em 2em;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    font-size: 1.5rem;
    line-height: 1.5;
    border-radius: 0.25rem;
  }
  > .reviews {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1em 2em 1em 2em;
    > .review {
      margin-bottom: 1em;
      > .review-text {
        border-radius: 5px;
        border: 1px solid grey;
        padding: 1rem;
      }
    } 
  }
  > .form {
    background: #e9e9e9;
    border: 1px solid #e9e9e9;
    padding: 16px;
    margin: 32px;
    max-width: 1136px;
    width: 100%;
    > .input-group {
      padding-bottom: 1em;
      align-items: stretch;
      width: 100%;
    }
    > .editor-top-wrapper {
      width: 100%;
      > .wrapper {
        width: 100%;
        .colorPickerPopup {
          top: 23px;
        }
        .linkPopup {
          left: -42px;
          top: 23px;
          height: 233px;
        }
        .emojiPopup {
          top: 23px;
          left: -148px;
        }
        .embeddedPopup {
          top: 23px;
          left: -111px;
        }
        .imagePopup {
          top: 23px;
          left: -186px;
        }
        > .toolbar {
          background: #e9e9e9;
          border: none;
        }
        > .editor {        
          width: 100%;
          padding: 0 1em 0 1em;
          background: #ffffff;
        }
      }
    }
    > .feedback-msgs {
      margin: 0 1em 1em 0;
      color: red;
      font-size: 1rem;
    }
    > .post-button {
      align-self: flex-start;
      margin: 1em 0 0 1em;
    }
  }
`
