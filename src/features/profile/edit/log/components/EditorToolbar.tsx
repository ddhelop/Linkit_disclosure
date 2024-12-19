'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import '../../style/editorToolbar.css'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

// Quill 관련 설정을 클라이언트 사이드에서만 실행
if (typeof window !== 'undefined') {
  const Quill = require('react-quill').Quill

  // Quill 모듈 임포트
  const Font = Quill.import('formats/font')
  const Size = Quill.import('formats/size')

  // 사이즈 설정
  Size.whitelist = ['16px', '18px', '24px']
  Quill.register(Size, true)

  // 폰트 설정
  Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida']
  Quill.register(Font, true)
}

// Quill modules and formats configuration
export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {},
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
}

export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'code-block',
]

// Toolbar layout
export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-header">
        <option value="">본문</option>
        <option value="2">중제목</option>
        <option value="1">대제목</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="bullet" />
      <button className="ql-list" value="ordered" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-code-block" />
    </span>
    <span className="ql-formats">
      <button className="ql-align" value="" />
      <button className="ql-align" value="center" />
    </span>
  </div>
)

export default QuillToolbar
