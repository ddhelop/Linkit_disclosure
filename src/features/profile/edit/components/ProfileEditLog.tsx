'use client'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getProfileLogs, ProfileLogItem } from '@/features/profile/api/getProfileLogs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { deleteProfileLog, updateProfileLogPublic, updateProfileLogType } from '../../api/profileLogApi'
import { LogListSkeleton } from './skeletons/LogListSkeleton'

import { stripHtmlAndImages } from '@/shared/hooks/useHtmlToString'
import { truncateText } from '@/shared/utils/stringUtils'
import { useToast } from '@/shared/hooks/useToast'
import NotContentsUi from './common/NotContentsUi'

export default function ProfileEditLog() {
  const router = useRouter()
  const [logs, setLogs] = useState<ProfileLogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showMenu, setShowMenu] = useState<number | null>(null)
  const toast = useToast()

  useEffect(() => {
    fetchLogs()
    // ESC 키 이벤트 리스너 추가
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMenu(null)
      }
    }
    window.addEventListener('keydown', handleEsc)

    // 메뉴 외부 클릭 이벤트 리스너
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('menu')
      if (menu && !menu.contains(event.target as Node)) {
        setShowMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const fetchLogs = async () => {
    try {
      const data = await getProfileLogs()
      setLogs(data)
    } catch (error) {
      console.error('Failed to fetch logs:', error)
      toast.alert('로그 조회에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const toggleMenu = (logId: number) => {
    setShowMenu(showMenu === logId ? null : logId)
  }

  const handleLogClick = (logId: number) => {
    router.push(`/profile/edit/log/new?id=${logId}`)
  }

  const handleDeleteLog = async (logId: number) => {
    setShowMenu(null)
    const isConfirmed = confirm('정말 삭제하시겠습니까?')
    if (!isConfirmed) return

    try {
      const response = await deleteProfileLog(logId)
      if (response.isSuccess) {
        toast.success('로그가 성공적으로 삭제되었습니다.')
        fetchLogs()
      } else {
        toast.alert(response.message || '로그 삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('Failed to delete log:', error)
      toast.alert('로그 삭제에 실패했습니다.')
    }
  }

  const handleUpdateLogType = async (logId: number) => {
    setShowMenu(null)
    try {
      await updateProfileLogType(logId)
      toast.success('대표글 설정이 변경되었습니다.')
      fetchLogs()
    } catch (error) {
      console.error('Failed to update log type:', error)
      toast.alert('대표글 설정 변경에 실패했습니다.')
    }
  }

  // 비공개 공개 업데이트
  const handleUpdateLogPublic = async (logId: number) => {
    try {
      const response = await updateProfileLogPublic(logId)
      if (response.isSuccess) {
        toast.success('공개 설정이 변경되었습니다.')
        fetchLogs()
      } else {
        toast.alert(response.message || '공개 설정 변경에 실패했습니다.')
      }
    } catch (error) {
      console.error('Failed to update log public:', error)
      toast.alert('대표글 설정 변경에 실패했습니다.')
    }
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

      {loading ? (
        <LogListSkeleton />
      ) : logs.length === 0 ? (
        <div className="mt-6">
          <NotContentsUi />
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-4 pt-1">
          {logs.map((log) => (
            <div key={log.profileLogId} className=" group relative flex flex-col rounded-xl bg-white p-5">
              <div className="flex cursor-pointer flex-col gap-3" onClick={() => handleLogClick(log.profileLogId)}>
                <div className="flex gap-2">
                  {log.logType === 'REPRESENTATIVE_LOG' && (
                    <Image src="/common/icons/pin.svg" width={18} height={18} alt="arrow" />
                  )}
                  {!log.isLogPublic && <Image src="/common/icons/lock.svg" width={10} height={10} alt="lock" />}
                  <span className="font-semibold text-grey80">{truncateText(log.logTitle, 20)}</span>
                </div>
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
                  className="absolute right-[-80px] top-9 mt-2 flex w-32 flex-col rounded-lg border border-grey40 bg-white p-2 shadow-lg"
                >
                  <div className="cursor-pointer px-3 py-1 text-sm text-grey70 hover:bg-grey10">수정하기</div>
                  <div
                    onClick={() => handleUpdateLogPublic(log.profileLogId)}
                    className="cursor-pointer px-3 py-1 text-sm text-grey70 hover:bg-grey10"
                  >
                    {log.isLogPublic ? '비공개로 전환' : '공개로 전환'}
                  </div>
                  <div
                    className={`px-3 py-1 text-sm text-grey70 ${
                      logs.length === 1 && log.logType === 'REPRESENTATIVE_LOG'
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer hover:bg-grey10'
                    }`}
                    onClick={() => {
                      if (logs.length === 1 && log.logType === 'REPRESENTATIVE_LOG') return
                      handleUpdateLogType(log.profileLogId)
                    }}
                  >
                    {log.logType === 'REPRESENTATIVE_LOG' ? '대표글 해제' : '대표글로 설정'}
                  </div>
                  <div
                    className="cursor-pointer px-3 py-1 text-sm text-[#FF345F] hover:bg-grey10"
                    onClick={() => handleDeleteLog(log.profileLogId)}
                  >
                    삭제하기
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
