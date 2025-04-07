'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { Button } from '@/shared/ui/Button/Button'
import Radio from '@/shared/ui/Radio/Radio'

// ReactQuill을 동적으로 가져옴 (SSR에서 문제 방지)
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full animate-pulse rounded-xl bg-gray-100"></div>,
})
import 'react-quill/dist/quill.snow.css'

// 툴바 모듈 import
import { QuillToolbar, modules, formats, initQuillEditor } from './EditorToolbar'
import { useLogEditorState } from '../model/useLogEditorState'
import { useLogSubmit } from '../model/useLogSubmit'
import { useLogDetail } from '../model/useLogDetail'
import ImageResize from 'quill-image-resize-module-react'
import { Quill } from 'react-quill'

// Quill에 이미지 리사이즈 모듈 등록
Quill.register('modules/imageResize', ImageResize)

// Quill 관련 타입 정의 확장
declare global {
  interface Element {
    __quill?: any
  }

  interface Window {
    __selectedImage: HTMLImageElement | null
  }
}

// 전역 상태 초기화
if (typeof window !== 'undefined') {
  window.__selectedImage = null
}

type LogWriteFormProps = {
  domainType?: 'TEAM' | 'PROFILE'
  teamCode?: string
}

export default function LogWriteForm({ domainType = 'PROFILE', teamCode }: LogWriteFormProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const logId = searchParams.get('id')
  const teamName = pathname.includes('/team/') ? pathname.split('/')[2] : null

  const { title, setTitle, contents, setContents, isPublic, setIsPublic } = useLogEditorState()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(!!logId)
  const quillEditorRef = useRef<any>(null)

  // DOMNodeInserted 경고 메시지 억제
  useEffect(() => {
    // 원래 콘솔 경고 함수 저장
    const originalConsoleWarn = console.warn

    // 콘솔 경고 함수 오버라이드
    console.warn = function (...args) {
      // DOMNodeInserted 관련 경고는 필터링
      if (
        args.length > 0 &&
        typeof args[0] === 'string' &&
        (args[0].includes('DOMNodeInserted') || args[0].includes('mutation event'))
      ) {
        return
      }
      // 다른 경고는 정상적으로 출력
      originalConsoleWarn.apply(console, args)
    }

    // 컴포넌트 언마운트 시 원래 함수로 복원
    return () => {
      console.warn = originalConsoleWarn
    }
  }, [])

  // 키보드 이벤트 핸들러 설정 (이미지 삭제 처리)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 전역 상태에서 선택된 이미지 확인
      if ((e.key === 'Delete' || e.key === 'Backspace') && window.__selectedImage) {
        try {
          e.preventDefault()

          // 현재 선택된 이미지 삭제
          const imgElement = window.__selectedImage
          const editorElement = document.querySelector('.ql-editor')

          if (imgElement && editorElement) {
            // 이미지 포함하는 상위 요소 (일반적으로 p 태그)
            const containerElement = imgElement.closest('p') || imgElement.parentElement

            if (containerElement) {
              containerElement.remove()
            } else {
              imgElement.remove()
            }

            // 전역 상태 초기화
            window.__selectedImage = null

            // 에디터 내용 변경 이벤트 발생시켜 React 상태 업데이트
            const inputEvent = new Event('input', { bubbles: true })
            editorElement.dispatchEvent(inputEvent)

            console.log('이미지가 성공적으로 삭제되었습니다')
          }
        } catch (error) {
          console.error('이미지 삭제 오류:', error)
        }
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener('keydown', handleKeyDown)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Quill 에디터 초기화 (DOM이 준비된 후)
  useEffect(() => {
    // DOM에서 Quill 인스턴스를 안전하게 가져오는 함수
    const getQuillInstanceSafely = () => {
      try {
        // 1. 가장 신뢰할 수 있는 방법: .ql-container에서 __quill 속성 찾기
        const container = document.querySelector('.ql-container') as Element | null
        if (container && container.__quill) {
          return container.__quill
        }

        // 2. ReactQuill이 마운트된 후 내부 구현을 통해 인스턴스 찾기
        const editor = document.querySelector('.ql-editor') as Element | null
        if (editor) {
          const editorContainer = editor.closest('.ql-container') as Element | null
          if (editorContainer && editorContainer.__quill) {
            return editorContainer.__quill
          }
        }

        // 3. Quill 생성자를 사용하여 찾기 (타입스크립트 에러 방지용 any 타입)
        if (typeof Quill === 'function') {
          const editors = Array.from(document.querySelectorAll('.ql-container'))
            .map((container) => {
              try {
                return (container as any).__quill
              } catch (e) {
                return null
              }
            })
            .filter(Boolean)

          if (editors.length > 0) {
            return editors[0]
          }
        }

        return null
      } catch (error) {
        console.error('Quill 인스턴스 찾기 오류:', error)
        return null
      }
    }

    // Quill 인스턴스를 찾고 초기화하는 함수
    const initializeQuillInstance = () => {
      // Quill 인스턴스 찾기
      const quillInstance = getQuillInstanceSafely()
      if (quillInstance) {
        console.log('Quill 인스턴스를 성공적으로 찾았습니다')
        // Quill 인스턴스를 EditorToolbar로 전달하여 초기화
        initQuillEditor(quillInstance)

        // 참조용으로 저장
        quillEditorRef.current = quillInstance

        // 에디터 내부 이미지 클릭 이벤트를 가로채서 사용자 정의 처리
        const setupImageHandler = () => {
          const editorElement = document.querySelector('.ql-editor') as HTMLElement | null
          if (!editorElement) return

          // 이미지 클릭 이벤트 리스너
          editorElement.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            if (target.tagName === 'IMG') {
              // 이미지가 클릭되면 Quill의 기본 선택 메커니즘을 중지
              e.stopPropagation()
              e.preventDefault()

              // 클릭된 이미지에 선택 효과 적용
              const editorImages = editorElement.querySelectorAll('img')
              editorImages.forEach((img) => {
                img.style.outline = 'none'
              })

              // 현재 이미지에 선택 표시
              target.style.outline = '2px solid #1a73e8'

              // 전역 상태에 현재 선택된 이미지 저장
              window.__selectedImage = target as HTMLImageElement
            } else if (window.__selectedImage) {
              // 다른 곳 클릭 시 이미지 선택 해제
              window.__selectedImage.style.outline = 'none'
              window.__selectedImage = null
            }
          })
        }

        // 초기 설정 및 이미지 클릭 핸들러 등록
        setupImageHandler()

        return true
      }
      return false
    }

    // ReactQuill 마운트 확인을 위한 인터벌 설정
    const checkInterval = setInterval(() => {
      if (document.querySelector('.ql-editor')) {
        // 에디터 DOM 요소 발견, 약간의 지연 후 초기화 시도
        setTimeout(() => {
          if (initializeQuillInstance()) {
            clearInterval(checkInterval)
          }
        }, 100)
      }
    }, 200)

    // 5초 후에도 찾지 못하면 인터벌 정리 (안전장치)
    const timeoutId = setTimeout(() => {
      clearInterval(checkInterval)
      console.warn('Quill 에디터를 찾지 못했습니다. 타임아웃')
    }, 5000)

    // 컴포넌트 언마운트 시 정리
    return () => {
      clearInterval(checkInterval)
      clearTimeout(timeoutId)
    }
  }, [])

  // 에디터가 준비되었을 때 호출되는 핸들러
  const handleEditorReady = (editor: any) => {
    if (editor) {
      quillEditorRef.current = editor
    }
  }

  useLogDetail({
    logId,
    teamName,
    setTitle,
    setContents,
    setIsPublic,
    setIsLoading,
  })

  const { submit } = useLogSubmit({ logId, teamName, domainType })

  const handleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    await submit({
      logTitle: title,
      logContent: contents,
      isLogPublic: isPublic,
    })

    setIsSubmitting(false)
  }

  if (isLoading) return <div className="py-10 text-center">로딩 중...</div>

  return (
    <>
      <div className="rounded-xl bg-white">
        <div className="p-5 md:px-[2.87rem] md:py-8">
          {/* 제목 입력 */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-grey80">제목</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-grey40 px-6 py-3 outline-none"
              placeholder="제목을 입력해 주세요 (100자 이내)"
            />
          </div>

          {/* 에디터 */}
          <div className="mt-6 flex flex-col gap-3">
            <span className="font-semibold text-grey80">내용</span>
            <div className="quill-editor-container">
              <QuillToolbar />
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={contents}
                onChange={setContents}
                placeholder="내용을 입력해 주세요."
                className="rounded-b-xl"
              />
            </div>
          </div>
        </div>

        {/* 공개 설정 */}
        <div className="mt-5 rounded-xl bg-white p-5 md:px-[2.88rem] md:py-7">
          <div className="flex flex-col gap-5">
            <span className="text-lg font-semibold text-grey80">설정</span>
            <div className="flex items-center gap-5">
              <Radio
                options={[
                  { label: '전체공개', value: 'public' },
                  { label: '비공개', value: 'private' },
                ]}
                selectedValue={isPublic ? 'public' : 'private'}
                onChange={(value) => setIsPublic(value === 'public')}
              />
            </div>
            <p className="mt-1 text-sm text-grey60">
              {isPublic ? '모든 사람이 이 글을 볼 수 있어요' : '나만 볼 수 있어요'}
            </p>
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="mt-5 flex w-full justify-between">
        <Link href={teamName ? `/team/${teamName}/edit/log` : '/profile/edit/log'}>
          <Button mode="sub" animationMode="sub">
            목록으로
          </Button>
        </Link>
        <Button mode="main" animationMode="main" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </>
  )
}
