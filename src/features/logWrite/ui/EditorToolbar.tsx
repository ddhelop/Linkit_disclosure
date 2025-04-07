'use client'

import './editorToolbar.css'
import { Quill } from 'react-quill'

// 글자 크기 화이트리스트 등록
const Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px']
Quill.register(Size, true)

export const modules = {
  toolbar: {
    container: '#toolbar',
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
}

export const formats = [
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'link',
  'image',
  'align',
  'color',
  'background',
]

export const QuillToolbar = () => (
  <div id="toolbar" className="quill-toolbar">
    <div className="flex flex-wrap items-center gap-2">
      <span>
        <select className="ql-header">
          <option value="">본문</option>
          <option value="2">중제목</option>
          <option value="1">대제목</option>
        </select>
      </span>
      <div className="divider" />
      <select className="ql-size">
        <option value="10px">10px</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px" selected>
          16px
        </option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        <option value="22px">22px</option>
        <option value="24px">24px</option>
      </select>
      <span>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
      </span>
      <select className="ql-color" />
      <select className="ql-background" />
      <div className="divider" />
      <span>
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="ordered" />
      </span>
      <div className="divider" />
      <span>
        <button className="ql-link" />
        <button className="ql-image" />
      </span>
      <div className="divider" />
      <span>
        <button className="ql-align" value="" />
        <button className="ql-align" value="center" />
      </span>
    </div>
  </div>
)
