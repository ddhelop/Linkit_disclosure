'use client'

import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import { useToast } from '@/shared/hooks/useToast'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { deleteTeamAnnouncement, toggleTeamAnnouncementClose, toggleTeamAnnouncementPublic } from '../../api/teamApi'
import { Announcement } from '../../types/team.types'

interface TeamEditRecruitComponentProps {
  announcement: Announcement
  teamName: string
  onDelete?: () => void
}

export default function TeamEditRecruitComponent({ announcement, teamName, onDelete }: TeamEditRecruitComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(announcement.isAnnouncementPublic)
  const [isClosed, setIsClosed] = useState(announcement.isClosed)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const toast = useToast()

  useEffect(() => {
    setIsPublic(announcement.isAnnouncementPublic)
  }, [announcement.isAnnouncementPublic])

  useOnClickOutside({
    refs: [menuRef, buttonRef],
    handler: () => setIsMenuOpen(false),
  })

  // 팀원 공고 삭제
  const handleDeleteAnnouncement = async (e: React.MouseEvent) => {
    e.preventDefault() // Link 이동 방지
    e.stopPropagation() // 이벤트 버블링 방지
    try {
      if (confirm('정말로 삭제하시겠습니까?')) {
        await deleteTeamAnnouncement(teamName, announcement.teamMemberAnnouncementId)
        onDelete?.()
        toast.success('삭제되었습니다.')
      }
    } catch (error) {
      console.error('Failed to delete team announcement', error)
      toast.alert('삭제에 실패했습니다.')
    }
  }

  // 팀원 공고 공개/비공개 전환
  const handleToggleAnnouncementPublic = async (e: React.MouseEvent) => {
    e.preventDefault() // Link 이동 방지
    e.stopPropagation() // 이벤트 버블링 방지
    try {
      const response = await toggleTeamAnnouncementPublic(teamName, announcement.teamMemberAnnouncementId)
      if (response.result.isAnnouncementPublic) {
        toast.success('공개로 전환되었습니다.')
        setIsPublic(true)
      } else {
        toast.success('비공개로 전환되었습니다.')
        setIsPublic(false)
      }
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Failed to toggle team announcement public', error)
      toast.alert('상태 변경에 실패했습니다.')
    }
  }

  // 팀원 공고 공개/비공개 전환
  const handleToggleAnnouncementClose = async (e: React.MouseEvent) => {
    e.preventDefault() // Link 이동 방지
    e.stopPropagation() // 이벤트 버블링 방지
    try {
      await toggleTeamAnnouncementClose(teamName, announcement.teamMemberAnnouncementId)
      toast.success('모집 마감으로 변경했습니다.')
      setIsClosed(true)
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Failed to toggle team announcement close', error)
      toast.alert('모집 마감으로의 변경에 실패했습니다.')
    }
  }

  return (
    <Link
      href={`/team/${teamName}/edit/recruit/new?id=${announcement.teamMemberAnnouncementId}`}
      className="flex w-full flex-col rounded-xl border border-transparent bg-white p-5 hover:border-main md:px-10 md:py-5"
    >
      <div className="flex items-center justify-between">
        <div
          className={twMerge(
            'flex rounded-full bg-[#FFECF0] px-3 py-1 text-xs text-[#FF345F]',
            isClosed && 'bg-grey30 text-grey60',
          )}
        >
          {announcement.isAnnouncementInProgress ? '모집 중' : '마감'}
        </div>
        <div className="relative">
          <div
            ref={buttonRef}
            onClick={(e) => {
              e.preventDefault() // Link 이동 방지
              e.stopPropagation() // 이벤트 버블링 방지
              setIsMenuOpen(!isMenuOpen)
            }}
          >
            <Image src="/common/icons/more_row.svg" alt="edit" width={20} height={20} className="cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div ref={menuRef} className="absolute right-0 z-10 mt-2 w-32 rounded-lg bg-white py-2 shadow-lg">
              <Link
                href={`/team/${teamName}/edit/recruit/new?id=${announcement.teamMemberAnnouncementId}`}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                수정하기
              </Link>
              <button
                onClick={handleToggleAnnouncementPublic}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                {isPublic ? '비공개로 전환' : '공개로 전환'}
              </button>
              {!isClosed && (
                <button
                  onClick={handleToggleAnnouncementClose}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                >
                  모집 마감
                </button>
              )}
              <button
                className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                onClick={handleDeleteAnnouncement}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        {!isPublic && <Image src="/common/icons/lock.svg" alt="edit" width={10} height={10} />}
        <h1 className="text-grey90">{announcement.announcementTitle}</h1>
      </div>
      <div className="mt-3 flex gap-2">
        <div
          className={twMerge(
            'rounded-[0.38rem] bg-[#D3E1FE] px-4 py-2 text-xs text-main',
            isClosed && 'bg-grey30 text-grey60',
          )}
        >
          {announcement.majorPosition}
        </div>
        {announcement.announcementSkillNames.slice(0, 1).map((skill, index) => (
          <div
            key={`${skill.announcementSkillName}-${index}`}
            className={twMerge(
              'rounded-[0.38rem] bg-[#EDF3FF] px-4 py-2 text-xs text-main',
              isClosed && 'bg-grey20 text-grey60',
            )}
          >
            {skill.announcementSkillName}
          </div>
        ))}
        {announcement.announcementSkillNames.length > 1 && (
          <div
            className={twMerge(
              'rounded-[0.38rem] bg-[#EDF3FF] px-4 py-2 text-xs text-main',
              isClosed && 'bg-grey20 text-grey60',
            )}
          >
            +{announcement.announcementSkillNames.length - 1}
          </div>
        )}
      </div>
    </Link>
  )
}
