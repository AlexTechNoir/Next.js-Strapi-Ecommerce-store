
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { EditorState } from 'draft-js'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function Reviews() {
  const [ editorState, setEditorState ] = useState(EditorState.createEmpty())

  return (
    <div>
      <Editor
        editorState={editorState}
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
  )
}
