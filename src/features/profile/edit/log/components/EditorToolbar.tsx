'use client'

import dynamic from 'next/dynamic'
import '../../style/editorToolbar.css'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

if (typeof window !== 'undefined') {
  const Quill = require('react-quill').Quill
  const Font = Quill.import('formats/font')
  const Size = Quill.import('formats/size')

  Size.whitelist = ['16px', '18px', '24px']
  Quill.register(Size, true)

  Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida']
  Quill.register(Font, true)
}

export const modules = {
  toolbar: {
    container: '#toolbar',
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
}

export const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'link', 'image', 'align']

export const QuillToolbar = () => (
  <div id="toolbar" className="flex items-center border-b border-grey30 bg-white px-4 py-2">
    <div className="flex flex-wrap items-center gap-4">
      <span className="ql-formats">
        <select className="ql-header">
          <option value="">본문</option>
          <option value="2">중제목</option>
          <option value="1">대제목</option>
        </select>
      </span>
      <div className="h-6 w-[1px] bg-grey30" />
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
      </span>
      <div className="h-6 w-[1px] bg-grey30" />
      <span className="ql-formats">
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="ordered" />
      </span>
      <div className="h-6 w-[1px] bg-grey30" />
      <span className="ql-formats">
        <button className="ql-link" />
        <button className="ql-image" />
      </span>
      <div className="h-6 w-[1px] bg-grey30" />
      <span className="ql-formats">
        <button className="ql-align" value="" />
        <button className="ql-align" value="center" />
      </span>
    </div>
  </div>
)

export default QuillToolbar
