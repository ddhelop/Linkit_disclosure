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

Quill.register('modules/imageResize', ImageResize)

const Size = Quill.import('formats/size')
Size.whitelist = ['16px', '18px', '24px']
Quill.register(Size, true)

// 팀 로그 생성 API 함수
const createTeamLog = async (
  teamName: string,
  logData: {
    logTitle: string
    logContent: string
    isLogPublic: boolean
  },
) => {
  try {
    const response = await fetchWithAuth(`/api/v1/team/${teamName}/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    })

    if (!response.ok) {
      throw new Error('Failed to create team log')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating team log:', error)
    throw error
  }
}

export default function LogWriteForm() {
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
  }, [logId])

  const fetchLogDetail = async (id: number) => {
    try {
      const data = await getProfileLog(id)
      setTitle(data.logTitle)
      setContents(data.logContent)
      setIsPublic(data.isLogPublic)
    } catch (error) {
      console.error('Failed to fetch log detail:', error)
      alert('로그 정보를 불러오는데 실패했습니다.')
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

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  const handleSubmit = async () => {
    if (isSubmitting) return
    if (!title.trim() || !contents.trim()) {
      alert('제목과 내용을 입력해주세요.')
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
        await updateProfileLog(logId, logData)
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

      alert('로그가 성공적으로 저장되었습니다.')
      // 팀/프로필에 따른 리다이렉트 처리
      if (teamName) {
        router.push(`/team/${teamName}/log`)
      } else {
        router.push('/profile/edit/log')
      }
    } catch (error) {
      console.error('로그 저장 실패:', error)
      alert('로그 저장에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="rounded-xl bg-white">
        <div className="px-[2.87rem] pb-10 pt-8">
          {/* 제목 입력 */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-grey80">제목</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-grey40 px-6 py-3 outline-none"
              placeholder="나를 한 문장으로 소개해 보세요. 나의 강점이나 목표, 관심분야도 좋아요."
            />
          </div>

          {/* 에디터 */}
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
              className="min-h-[600px] min-w-[430px]"
            />
          </div>
        </div>

        {/* 공개 설정 */}
        <div className="mt-5 rounded-xl bg-white px-[2.88rem] pb-8 pt-7">
          <div className="flex flex-col gap-5">
            <span className="text-lg font-semibold text-grey80">설정</span>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <input
                  id="public"
                  type="radio"
                  name="visibility"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                  className="h-3 w-3 appearance-none rounded-full border-gray-300 bg-gray-100 ring-2 ring-gray-300 checked:border-blue-600 checked:bg-blue-600 checked:ring-2 checked:ring-blue-500"
                />
                <label htmlFor="public">전체공개</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="private"
                  type="radio"
                  name="visibility"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                  className="h-3 w-3 appearance-none rounded-full border-gray-300 bg-gray-100 ring-2 ring-gray-300 checked:border-blue-600 checked:bg-blue-600 checked:ring-2 checked:ring-blue-500"
                />
                <label htmlFor="private">비공개</label>
              </div>
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
