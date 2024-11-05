import React from 'react'
import { Quill } from 'react-quill'
import '../../style/editorToolbar.css'

// Add custom sizes to the whitelist and register them
const Size = Quill.import('formats/size')
Size.whitelist = ['18', '24', '30']
Quill.register(Size, true)

// Add custom fonts to the whitelist and register them
const Font = Quill.import('formats/font')
Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida']
Quill.register(Font, true)

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
      <select className="ql-font">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size">
        <option value="16px">본문</option>
        <option value="18px">제목 2</option>
        <option value="24px">제목 1</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-blockquote" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
    </span>
    <span className="ql-formats">
      <button className="ql-image" />
      <button className="ql-link" />
    </span>
    <span className="ql-formats">
      <button className="ql-align" value="" />
      <button className="ql-align" value="center" />
      <button className="ql-align" value="right" />
      <button className="ql-align" value="justify" />
    </span>
  </div>
)

export default QuillToolbar
