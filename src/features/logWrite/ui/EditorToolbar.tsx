'use client'

import './editorToolbar.css'
import { Quill } from 'react-quill'

// 글자 크기 화이트리스트 등록
const Size = Quill.import('attributors/style/size')
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px']
Quill.register(Size, true)

// 전역 변수로 선택 영역 저장
let lastSelection: { index: number; length: number } | null = null

// Quill 에디터 인스턴스 참조 저장
let quillInstance: any = null

// 에디터 초기화 함수 - LogWriteForm에서 호출해야 함
export const initQuillEditor = (editor: any) => {
  quillInstance = editor

  // 선택 영역 변경 이벤트 리스너 추가
  if (quillInstance) {
    quillInstance.on('selection-change', (range: { index: number; length: number } | null) => {
      lastSelection = range
    })
  }
}

// 이미지 핸들러 함수
export const imageHandler = () => {
  // 파일 입력 요소 생성
  const input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.click()

  // 파일이 선택되면 처리
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return

    try {
      // FormData 생성 및 파일 추가
      const formData = new FormData()
      formData.append('profileLogBodyImage', file)

      // 서버에 업로드
      const response = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}/api/v1/profile/log/body/image`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('이미지 업로드 실패')
      }

      // 응답 처리
      const data = await response.json()

      if (data.isSuccess && data.result.profileLogBodyImagePath) {
        // 이미지 URL 추출
        const imageUrl = data.result.profileLogBodyImagePath

        // quillInstance 참조가 있는지 확인하고 사용
        if (quillInstance && typeof quillInstance.insertEmbed === 'function') {
          try {
            // 저장된 선택 영역이 있으면 해당 위치에 삽입, 없으면 끝에 추가
            const insertIndex = lastSelection ? lastSelection.index : quillInstance.getLength() - 1

            // 이미지 삽입
            quillInstance.insertEmbed(insertIndex, 'image', imageUrl)

            // 이미지 다음으로 커서 이동
            quillInstance.setSelection(insertIndex + 1, 0)

            return
          } catch (err) {
            // 오류 발생 시 DOM 직접 조작 방식으로 대체
          }
        }

        // quillInstance가 없거나 오류 발생 시 대체 방법 (DOM 직접 조작)
        const editorDiv = document.querySelector('.ql-editor')
        if (editorDiv) {
          // 이미지 요소 생성
          const img = document.createElement('img')
          img.src = imageUrl
          img.alt = '업로드된 이미지'
          img.style.maxWidth = '100%'

          // 단락 생성
          const p = document.createElement('p')
          p.appendChild(img)

          // 현재 선택된 범위 정보 가져오기
          const selection = window.getSelection()

          // 선택 위치에 이미지 삽입
          if (selection && selection.rangeCount > 0 && editorDiv.contains(selection.anchorNode)) {
            const range = selection.getRangeAt(0)
            range.deleteContents()
            range.insertNode(p)
          } else {
            // 선택된 위치가 없으면 맨 끝에 추가
            editorDiv.appendChild(p)
          }

          // input 이벤트 발생시켜 Quill에 변경 알림
          const event = new Event('input', { bubbles: true })
          editorDiv.dispatchEvent(event)
        }
      } else {
      }
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.')
    }
  }
}

export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      image: imageHandler,
    },
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
      <select className="ql-size" defaultValue="16px">
        <option value="10px">10px</option>
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
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
