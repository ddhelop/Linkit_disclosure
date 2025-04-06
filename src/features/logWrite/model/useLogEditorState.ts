import { useState } from 'react'

export const useLogEditorState = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  return {
    title,
    setTitle,
    contents,
    setContents,
    isPublic,
    setIsPublic,
  }
}
