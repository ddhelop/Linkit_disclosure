'use client'

import 'react-quill/dist/quill.snow.css'
import ReactQuill, { Quill } from 'react-quill'
import { useRef, useMemo, useState } from 'react'
import EditorToolbar, { formats } from './EditorToolbar'
import ImageResize from 'quill-image-resize-module-react'

// Register the ImageResize module with Quill
Quill.register('modules/imageResize', ImageResize)

// Size 포맷을 커스터마이즈하여 원하는 크기를 추가
const Size = Quill.import('formats/size')
Size.whitelist = ['16px', '18px', '24px'] // 본문: 16px, 제목 2: 18px, 제목 1: 24px
Quill.register(Size, true)

export default function LogWriteForm() {
  const QuillRef = useRef<ReactQuill>()
  const [contents, setContents] = useState('')
  const [editorHeight, setEditorHeight] = useState('auto')

  // 이미지 업로드 핸들러 함수
  const imageHandler = () => {
    const input = document.createElement('input')
    const formData = new FormData()

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files
      if (file !== null) {
        formData.append('img', file[0])
        try {
          const response = await fetch('http://localhost:8080/uploadImg', {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            throw new Error('이미지 업로드 실패')
          }

          const data = await response.json()
          const url = data[0]
          const range = QuillRef.current?.getEditor().getSelection()?.index
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor()
            quill?.setSelection(range, 1)
            quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${url} alt="이미지 태그가 삽입됩니다." />`)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  // 에디터 높이 자동 조절
  const handleEditorChange = (value: any) => {
    setContents(value)
    if (QuillRef.current) {
      const editor = QuillRef.current.getEditor()
      const editorContent = editor.root
      setEditorHeight(`${editorContent.scrollHeight}px`)
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: '#toolbar',
        handlers: { image: imageHandler },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    }),
    [],
  )

  return (
    <div className="px-[2.87rem] pb-10 pt-8">
      {/* 제목 */}
      <div className="flex flex-col gap-3">
        <span className="font-semibold text-grey80">제목</span>
        <input
          className="w-full rounded-xl border border-grey40 px-6 py-3 outline-none"
          placeholder="나를 한 문장으로 소개해 보세요. 나의 강점이나 목표, 관심분야도 좋아요."
        />
      </div>

      {/* 내용 */}
      <div className="mt-6 flex flex-col gap-3">
        <span className="font-semibold text-grey80">내용</span>
        <EditorToolbar />
        <ReactQuill
          ref={(element) => {
            if (element !== null) {
              QuillRef.current = element
            }
          }}
          value={contents}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="팀과 팀원들에게 도움이 될 수 있는 나의 장점과 강점 등을 소개해 주세요"
          style={{
            minWidth: '430px',
            minHeight: '300px',
            height: editorHeight,
          }}
        />
      </div>
    </div>
  )
}
