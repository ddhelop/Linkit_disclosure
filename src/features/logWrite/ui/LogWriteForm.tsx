'use client'

import { useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { Button } from '@/shared/ui/Button/Button'
import Radio from '@/shared/ui/Radio/Radio'

// ReactQuill을 동적으로 가져옴 (SSR에서 문제 방지)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

// 툴바 모듈 import
import { QuillToolbar, modules, formats } from './EditorToolbar'
import { useLogEditorState } from '../model/useLogEditorState'
import { useLogSubmit } from '../model/useLogSubmit'
import { useLogDetail } from '../model/useLogDetail'
import ImageResize from 'quill-image-resize-module-react'
import { Quill } from 'react-quill'

// Quill에 이미지 리사이즈 모듈 등록
Quill.register('modules/imageResize', ImageResize)

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

  const quillRef = useRef<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(!!logId)

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
