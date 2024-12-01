'use client'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getProfileLogs, ProfileLogItem } from '@/features/profile/api/getProfileLogs'
import Image from 'next/image'

export default function ProfileEditLog() {
  const [logs, setLogs] = useState<ProfileLogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showMenu, setShowMenu] = useState<number | null>(null)

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      const data = await getProfileLogs()
      setLogs(data)
    } catch (error) {
      console.error('Failed to fetch logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const stripHtmlAndImages = (html: string) => {
    // 임시 div 엘리먼트 생성
    const doc = new DOMParser().parseFromString(html, 'text/html')

    // 이미지 태그 제거
    doc.querySelectorAll('img').forEach((img) => img.remove())

    // HTML을 텍스트로 변환
    const textContent = doc.body.textContent || doc.body.innerText || ''

    // 연속된 공백 제거 및 트림
    return textContent.replace(/\s+/g, ' ').trim()
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  const toggleMenu = (logId: number) => {
    setShowMenu(showMenu === logId ? null : logId)
  }

  if (loading) {
    return <div>로딩 중...</div>
  }

  return (
    <div>
      <Link href="/profile/edit/log/new">
        <Button
          mode="main"
          animationMode="main"
          className="flex w-full items-center justify-center gap-[0.68rem] rounded-lg bg-main2 px-5 py-2 text-sm font-semibold text-white"
        >
          추가하기
        </Button>
      </Link>

      {/* 로그 리스트 */}
      <div className="mt-5 flex flex-col gap-4 pt-1">
        {logs.map((log) => (
          <div key={log.profileLogId} className="group relative flex flex-col rounded-xl bg-white p-5">
            <div className="flex cursor-pointer flex-col gap-3">
              <span className="font-semibold text-grey80">{truncateText(log.logTitle, 20)}</span>
              <span className="text-xs font-normal text-grey60">{new Date(log.modifiedAt).toLocaleDateString()}</span>
            </div>

            <div className="mt-5 rounded-xl bg-grey10 px-6 py-[1.31rem] text-sm text-grey70">
              {truncateText(stripHtmlAndImages(log.logContent), 70)}
            </div>

            {/* 수정, 삭제, 더보기 버튼 */}
            <div className="absolute right-0 top-7 flex -translate-y-1/2 gap-2 pr-6 duration-100">
              <Image
                src="/common/icons/more_row.svg"
                width={22}
                height={22}
                alt="more"
                className="cursor-pointer"
                onClick={() => toggleMenu(log.profileLogId)}
              />
            </div>

            {/* 메뉴창 */}
            {showMenu === log.profileLogId && (
              <div
                id="menu"
                className="absolute right-0 mt-2 flex w-32 flex-col rounded-lg border border-grey40 bg-white p-2 shadow-lg"
              >
                <div className="cursor-pointer px-2 py-2 text-sm text-grey70 hover:bg-grey10">수정하기</div>
                <div className="cursor-pointer px-2 py-1 text-sm text-grey70 hover:bg-grey10">
                  {log.isLogPublic ? '비공개로 전환' : '공개로 전환'}
                </div>
                <div className="cursor-pointer px-2 py-1 text-sm text-grey70 hover:bg-grey10">
                  {log.profileLogType === 'REPRESENTATIVE_LOG' ? '대표글 해제' : '대표글로 설정'}
                </div>
                <div className="cursor-pointer px-2 py-1 text-sm text-[#FF345F] hover:bg-grey10">삭제하기</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
