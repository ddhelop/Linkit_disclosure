// LogWriteForm.tsx
'use client'

import 'react-quill/dist/quill.snow.css'
import ReactQuill, { Quill } from 'react-quill'
import { useRef, useMemo, useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import EditorToolbar, { formats } from './EditorToolbar'
import ImageResize from 'quill-image-resize-module-react'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { createProfileLog, updateProfileLog } from '@/features/profile/api/createProfileLog'
import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'
import { getProfileLog } from '@/features/profile/api/getProfileLogs'
import { getTeamLog, createTeamLog, updateTeamLog } from '@/features/team/api/teamApi'
import { useToast } from '@/shared/hooks/useToast'
import Radio from '@/shared/ui/Radio/Radio'

Quill.register('modules/imageResize', ImageResize)

const Size = Quill.import('formats/size')
Size.whitelist = ['16px', '18px', '24px']
Quill.register(Size, true)

type LogWriteFormProps = {
  domainType?: 'TEAM' | 'PROFILE'
  teamCode?: string
}

export default function LogWriteForm({ domainType = 'PROFILE', teamCode }: LogWriteFormProps) {
  const toast = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const logId = searchParams.get('id')

  // URL에서 teamName 추출
  const teamName = pathname.includes('/team/') ? pathname.split('/')[2] : null

  const QuillRef = useRef<ReactQuill | null>(null)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(!!logId)

  useEffect(() => {
    if (logId) {
      fetchLogDetail(parseInt(logId))
    }
  }, [logId, teamName])

  const fetchLogDetail = async (id: number) => {
    try {
      let data
      if (teamName) {
        // 팀 로그 조회
        data = await getTeamLog(teamName, id)
        setTitle(data.result.logTitle)
        setContents(data.result.logContent)
        setIsPublic(data.result.isLogPublic)
      } else {
        // 프로필 로그 조회
        data = await getProfileLog(id)
        setTitle(data.logTitle)
        setContents(data.logContent)
        setIsPublic(data.isLogPublic)
      }
    } catch (error) {
      toast.alert('로그 정보를 불러오는데 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (file) {
        const formData = new FormData()

        // domainType에 따라 formData key 설정
        const imageKey = domainType === 'TEAM' ? 'teamLogBodyImage' : 'profileLogBodyImage'
        formData.append(imageKey, file)

        try {
          // domainType에 따라 API 엔드포인트 설정
          const endpoint =
            domainType === 'TEAM' ? `/api/v1/team/${teamCode}/log/body/image` : '/api/v1/profile/log/body/image'

          const response = await fetchWithAuth(endpoint, {
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
          // response 데이터 구조에 따라 이미지 경로 추출
          const url = domainType === 'TEAM' ? data.result.teamLogBodyImagePath : data.result.profileLogBodyImagePath

          const quill = QuillRef.current?.getEditor()
          if (quill) {
            const range = quill.getSelection(true)
            quill.insertEmbed(range.index, 'image', url)
            quill.setSelection(range.index + 1, 0)
          }
        } catch (err) {
          console.log(err)
          toast.alert('이미지 업로드에 실패했습니다.')
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

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  const handleSubmit = async () => {
    if (isSubmitting) return
    if (!title.trim() || !contents.trim()) {
      toast.alert('제목과 내용을 입력해주세요.')
      return
    }

    try {
      setIsSubmitting(true)
      const logData = {
        logTitle: title,
        logContent: contents,
        isLogPublic: isPublic,
      }

      if (logId) {
        // 수정 로직
        if (teamName) {
          // 팀 로그 수정
          await updateTeamLog(teamName, parseInt(logId), logData)
        } else {
          // 프로필 로그 수정
          await updateProfileLog(logId, logData)
        }
      } else {
        // 새로운 로그 생성
        if (teamName) {
          // 팀 로그 생성
          await createTeamLog(teamName, logData)
        } else {
          // 프로필 로그 생성
          await createProfileLog(logData)
        }
      }

      toast.success('로그가 성공적으로 저장되었습니다.')
      // 팀/프로필에 따른 리다이렉트 처리
      if (teamName) {
        router.push(`/team/${teamName}/edit/log`)
      } else {
        router.push('/profile/edit/log')
      }
    } catch (error) {
      toast.alert('로그 저장에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <div className="relative rounded-xl border border-grey30">
              <div className="sticky top-0 z-[100] bg-white">
                <EditorToolbar />
              </div>
              <div className="relative">
                <ReactQuill
                  ref={QuillRef}
                  value={contents}
                  onChange={setContents}
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  placeholder="내용을 입력해 주세요 (5,000자 이내)"
                  className="h-[600px] w-full bg-white"
                />
              </div>
              <style jsx global>{`
                .ql-container {
                  height: calc(600px - 42px) !important;
                }
                .ql-container .ql-editor {
                  height: 100%;
                  max-height: none;
                  overflow-y: auto;
                }
                .ql-tooltip {
                  z-index: 200 !important;
                  position: absolute !important;
                }
              `}</style>
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
        <Link href="/profile/edit/log">
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
