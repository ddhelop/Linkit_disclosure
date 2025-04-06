'use client'

import './editorToolbar.css'

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
  <div id="toolbar" className="flex items-center border-b border-grey30 bg-white px-4 py-2">
    <div className="flex flex-wrap items-center gap-2">
      <span>
        <select className="ql-header">
          <option value="">본문</option>
          <option value="2">중제목</option>
          <option value="1">대제목</option>
        </select>
      </span>
      <div className="h-6 w-[1px] bg-grey30" />
      <select className="ql-size">
        <option value="10px"></option>
        <option value="12px"></option>
        <option value="14px"></option>
        <option selected></option>
        <option value="18px"></option>
        <option value="20px"></option>
        <option value="22px"></option>
        <option value="24px"></option>
      </select>
      <span>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
      </span>
      <select className="ql-color">
        <option selected></option>
        <option value="red"></option>
        <option value="green"></option>
        <option value="blue"></option>
        <option value="cyan"></option>
        <option value="magenta"></option>
        <option value="yellow"></option>
        <option value="white"></option>
        <option value="gold"></option>
        <option value="silver"></option>
      </select>
      <select className="ql-background">
        <option selected></option>
        <option value="red"></option>
        <option value="green"></option>
        <option value="blue"></option>
        <option value="cyan"></option>
        <option value="magenta"></option>
        <option value="yellow"></option>
        <option value="black"></option>
        <option value="gold"></option>
        <option value="silver"></option>
      </select>
      <div className="h-6 w-[1px] bg-grey30" />
      <span>
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="ordered" />
      </span>
      <div className="h-6 w-[1px] bg-grey30" />
      <span>
        <button className="ql-link" />
        <button className="ql-image" />
      </span>
      <div className="h-6 w-[1px] bg-grey30" />
      <span>
        <button className="ql-align" value="" />
        <button className="ql-align" value="center" />
      </span>
    </div>
  </div>
)
