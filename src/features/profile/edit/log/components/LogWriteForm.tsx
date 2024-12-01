// LogWriteForm.tsx
'use client'

import 'react-quill/dist/quill.snow.css'
import ReactQuill, { Quill } from 'react-quill'
import { useRef, useMemo, useState, useEffect } from 'react'
import EditorToolbar, { formats } from './EditorToolbar'
import ImageResize from 'quill-image-resize-module-react'
import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

// 필요한 경우 ImageResize 모듈 등록
Quill.register('modules/imageResize', ImageResize)

// 필요 시 Size 포맷 커스터마이즈
const Size = Quill.import('formats/size')
Size.whitelist = ['16px', '18px', '24px']
Quill.register(Size, true)

export default function LogWriteForm() {
  const QuillRef = useRef<ReactQuill | null>(null)
  const [contents, setContents] = useState('')

  // 이미지 업로드 핸들러 함수
  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (file) {
        const formData = new FormData()
        formData.append('profileLogBodyImage', file)
        try {
          const response = await fetchWithAuth('/api/v1/profile/log/body/image', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            credentials: 'include',
            body: formData,
          })

          if (!response.ok) {
            throw new Error('이미지 업로드 실패')
          }

          const data = await response.json()
          const url = data.result.profileLogBodyImagePath

          const quill = QuillRef.current?.getEditor()
          if (quill) {
            const range = quill.getSelection(true)
            quill.insertEmbed(range.index, 'image', url)
            quill.setSelection(range.index + 1, 0)
          }
        } catch (err) {
          console.log(err)
        }
      }
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
          ref={QuillRef}
          value={contents}
          onChange={setContents}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="팀과 팀원들에게 도움이 될 수 있는 나의 장점과 강점 등을 소개해 주세요"
          style={{
            minWidth: '430px',
            minHeight: '600px',
          }}
        />
      </div>
    </div>
  )
}
