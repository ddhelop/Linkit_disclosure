'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { truncateText } from '@/shared/utils/stringUtils'
import { stripHtmlAndImages } from '@/shared/hooks/useHtmlToString'
import { useToast } from '@/shared/hooks/useToast'
import { ProfileLogDetailType } from '../types'
import { deleteProfileLog } from '../api/deleteProfileLog'
import { updateProfileLogPublic, updateProfileLogType } from '../api/updateProfileLog'

interface Props {
  log: ProfileLogDetailType
  isOnlyLog: boolean
  refetch: () => void
}

export default function ProfileEditLogItem({ log, isOnlyLog, refetch }: Props) {
  const [showMenu, setShowMenu] = useState(false)
  const toast = useToast()
  const queryClient = useQueryClient()

  const toggleMenu = () => {
    setShowMenu((prev) => !prev)
  }

  // 삭제
  const deleteMutation = useMutation({
    mutationFn: deleteProfileLog,
    onSuccess: () => {
      toast.success('삭제되었습니다.')
      setShowMenu(false)
      queryClient.invalidateQueries({ queryKey: ['myProfileLogs'] })
      refetch()
    },
    onError: () => {
      toast.alert('삭제 중 오류 발생')
    },
  })

  // 공개 설정 변경
  const updatePublicMutation = useMutation({
    mutationFn: updateProfileLogPublic,
    onSuccess: () => {
      toast.success('공개 설정이 변경되었습니다.')
      refetch()
    },
    onError: () => {
      toast.alert('공개 설정 변경 실패')
    },
  })

  // 대표글 설정 변경
  const updateTypeMutation = useMutation({
    mutationFn: updateProfileLogType,
    onSuccess: () => {
      toast.success('대표글 설정이 변경되었습니다.')
      refetch()
    },
    onError: () => {
      toast.alert('대표글 설정 변경 실패')
    },
  })

  // 삭제
  const handleDeleteLog = () => {
    const confirmed = confirm('정말 삭제하시겠습니까?')
    if (confirmed) {
      deleteMutation.mutate(log.profileLogId)
    }
  }

  // 공개 설정 변경
  const handleTogglePublic = () => {
    updatePublicMutation.mutate(log.profileLogId)
  }

  // 대표글 설정 변경
  const handleToggleRepresentative = () => {
    if (isOnlyLog && log.logType === 'REPRESENTATIVE_LOG') return
    updateTypeMutation.mutate(log.profileLogId)
  }

  return (
    <Link
      href={`/profile/edit/log/new?id=${log.profileLogId}`}
      className="group relative flex flex-col rounded-xl border bg-white p-5 hover:border-main"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex gap-2">
          {log.logType === 'REPRESENTATIVE_LOG' && (
            <Image src="/common/icons/pin.svg" width={18} height={18} alt="pin" />
          )}
          {!log.isLogPublic && <Image src="/common/icons/lock.svg" width={10} height={10} alt="lock" />}
          <span className="font-semibold text-grey80">{truncateText(log.logTitle, 20)}</span>
        </div>
        <span className="text-xs text-grey60">{new Date(log.modifiedAt).toLocaleDateString()}</span>
      </div>

      <div className="mt-5 rounded-xl bg-grey10 px-6 py-[1.31rem] text-sm text-grey70">
        {truncateText(stripHtmlAndImages(log.logContent), 70)}
      </div>

      <div
        onClick={(e) => {
          e.preventDefault()
          toggleMenu()
        }}
        className="absolute right-0 top-7 flex -translate-y-1/2 gap-2 pr-6"
      >
        <Image src="/common/icons/more_row.svg" width={22} height={22} alt="more" />
      </div>

      {showMenu && (
        <div className="absolute right-0 top-9 mt-2 flex w-32 flex-col rounded-lg border border-grey40 bg-white p-2 shadow-lg sm:right-[-80px]">
          <Link href={`/profile/edit/log/new?id=${log.profileLogId}`} className="px-3 py-1 text-sm hover:bg-grey10">
            수정하기
          </Link>
          <div
            onClick={(e) => {
              e.preventDefault()
              handleTogglePublic()
            }}
            className="cursor-pointer px-3 py-1 text-sm hover:bg-grey10"
          >
            {log.isLogPublic ? '비공개로 전환' : '공개로 전환'}
          </div>
          <div
            onClick={(e) => {
              e.preventDefault()
              handleToggleRepresentative()
            }}
            className={`px-3 py-1 text-sm ${
              isOnlyLog && log.logType === 'REPRESENTATIVE_LOG'
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-grey10'
            }`}
          >
            {log.logType === 'REPRESENTATIVE_LOG' ? '대표글 해제' : '대표글로 설정'}
          </div>
          <div onClick={handleDeleteLog} className="cursor-pointer px-3 py-1 text-sm text-[#FF345F] hover:bg-grey10">
            삭제하기
          </div>
        </div>
      )}
    </Link>
  )
}
