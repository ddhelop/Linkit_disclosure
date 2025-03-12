'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'

import { deleteTeamLog, setTeamLogAsRepresentative, toggleTeamLogVisibility } from '../../api/teamApi'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { stripHtmlAndImages } from '@/shared/hooks/useHtmlToString'
import { useToast } from '@/shared/hooks/useToast'
import { TeamLog } from '../../types/team.types'

interface TeamLogComponentProps {
  log: TeamLog & {
    isLogPublic: boolean
    logType: 'REPRESENTATIVE_LOG' | 'GENERAL_LOG'
  }
  onDelete?: () => void
}

export default function TeamLogComponent({ log, onDelete }: TeamLogComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(log.isLogPublic)
  const [logType, setLogType] = useState(log.logType)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const teamName = params.teamName as string
  const toast = useToast()
  const router = useRouter()
  useOnClickOutside({
    refs: [menuRef, buttonRef],
    handler: () => setIsMenuOpen(false),
    isEnabled: isMenuOpen,
  })

  const handleDelete = async () => {
    if (window.confirm('정말로 이 로그를 삭제하시겠습니까?')) {
      try {
        await deleteTeamLog(teamName, log.teamLogId)
        setIsMenuOpen(false)
        toast.success('로그가 삭제되었습니다.')
        onDelete?.() // 삭제 후 목록 새로고침
      } catch (error) {
        console.error('Failed to delete log:', error)
        toast.alert('로그 삭제에 실패했습니다.')
      }
    }
  }

  const handleSetRepresentative = async () => {
    try {
      await setTeamLogAsRepresentative(teamName, log.teamLogId)
      setLogType('REPRESENTATIVE_LOG')
      setIsMenuOpen(false)
      toast.success('대표글로 설정되었습니다.')
      window.location.reload()
    } catch (error) {
      console.error('Failed to set representative:', error)
      toast.alert('대표글 설정에 실패했습니다.')
    }
  }

  const handleToggleVisibility = async () => {
    try {
      await toggleTeamLogVisibility(teamName, log.teamLogId)
      setIsPublic(!isPublic)
      setIsMenuOpen(false)
      toast.success(isPublic ? '비공개로 설정되었습니다.' : '공개로 설정되었습니다.')
    } catch (error) {
      console.error('Failed to toggle visibility:', error)
      toast.alert('설정 변경에 실패했습니다.')
    }
  }

  return (
    <div>
      <Link
        href={`/team/${teamName}/edit/log/new?id=${log.teamLogId}`}
        className="flex w-full flex-col rounded-xl border bg-white p-5 hover:border-main"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {logType === 'REPRESENTATIVE_LOG' && <Image src="/common/icons/pin.svg" width={20} height={20} alt="pin" />}
            {!isPublic && <Image src="/common/icons/lock.svg" width={14} height={14} alt="lock" />}
            <div className="cursor-pointer font-semibold text-grey80">{log.logTitle}</div>

            <span className="gap-2 text-grey50">|</span>
            <span className="text-xs text-grey60">{new Date(log.modifiedAt).toLocaleDateString()}</span>
          </div>
          <div className="relative">
            <div
              ref={buttonRef}
              onClick={(e) => {
                e.preventDefault()
                setIsMenuOpen(!isMenuOpen)
              }}
              className="cursor-pointer"
            >
              <Image src="/common/icons/more_row.svg" width={20} height={20} alt="more" />
            </div>
            {isMenuOpen && (
              <div ref={menuRef} className="absolute right-0 z-30 mt-2 w-28 rounded-lg bg-white shadow-lg">
                <div className="flex flex-col py-2 ">
                  <Link
                    href={`/team/${teamName}/edit/log/new?id=${log.teamLogId}`}
                    className="w-full px-4 py-2 text-left text-xs text-grey70 hover:bg-gray-100"
                  >
                    수정하기
                  </Link>
                  <button
                    onClick={handleToggleVisibility}
                    className="w-full px-4 py-2 text-left text-xs text-grey70 hover:bg-gray-100"
                  >
                    공개/비공개
                  </button>
                  <button
                    onClick={handleSetRepresentative}
                    className="w-full px-4 py-2 text-left text-xs text-grey70 hover:bg-gray-100"
                  >
                    대표글로 설정
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-xs text-[#FF345F] hover:bg-gray-100"
                  >
                    삭제하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-grey10 p-5">
          <p className="text-sm text-grey70">{stripHtmlAndImages(log.logContent)}</p>
        </div>
      </Link>
    </div>
  )
}
