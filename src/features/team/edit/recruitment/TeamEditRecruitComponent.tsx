'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside'
import { TeamAnnouncement } from '../../api/teamApi'

interface TeamEditRecruitComponentProps {
  announcement: TeamAnnouncement
  teamName: string
}

export default function TeamEditRecruitComponent({ announcement, teamName }: TeamEditRecruitComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({
    refs: [menuRef, buttonRef],
    handler: () => setIsMenuOpen(false),
  })

  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-10 py-5">
      <div className="flex items-center justify-between">
        <div className="flex rounded-full bg-[#FFECF0] px-3 py-1 text-xs text-[#FF345F]">
          {announcement.isAnnouncementInProgress ? '모집중' : '모집완료'}
        </div>
        <div className="relative">
          <div ref={buttonRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Image src="/common/icons/more_row.svg" alt="edit" width={20} height={20} className="cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div ref={menuRef} className="absolute left-0 mt-2 w-32 rounded-lg bg-white py-2 shadow-lg">
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">수정하기</button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
                {announcement.isAnnouncementPublic ? '비공개로 전환' : '공개로 전환'}
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100">삭제하기</button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        <h1 className="text-grey90">{announcement.announcementTitle}</h1>
      </div>
      <div className="mt-3 flex gap-4">
        <div className="rounded-[0.38rem] bg-[#D3E1FE] px-4 py-2 text-xs text-main">{announcement.majorPosition}</div>
        {announcement.announcementSkillNames.map((skill, index) => (
          <div key={index} className="rounded-[0.38rem] bg-[#EDF3FF] px-4 py-2 text-xs text-main">
            {skill.announcementSkillName}
          </div>
        ))}
      </div>
    </div>
  )
}
