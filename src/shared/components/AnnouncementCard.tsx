'use client'
import { Announcement } from '@/features/find/types/FindTypes'

import Image from 'next/image'
import { useState } from 'react'
import { announcementScrap } from '../api/commonApi'
import Link from 'next/link'
import { useToast } from '../hooks/useToast'
import { AnnouncementInformMenu } from '@/features/match/types/MatchTypes'

export default function AnnouncementCard({ announcement }: { announcement: AnnouncementInformMenu }) {
  const [isScrap, setIsScrap] = useState(announcement?.isAnnouncementScrap ?? false)
  const [isScrapLoading, setIsScrapLoading] = useState(false)
  const [scrapCount, setScrapCount] = useState(announcement?.announcementScrapCount ?? 0)
  const toast = useToast()

  const handleScrap = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault() // Link 컴포넌트의 기본 동작 방지
    if (isScrapLoading) return

    try {
      setIsScrapLoading(true)
      const response = await announcementScrap(announcement?.teamMemberAnnouncementId, !isScrap)
      if (response.ok) {
        setIsScrap(!isScrap)
        setScrapCount((prev) => (!isScrap ? prev + 1 : prev - 1))
        toast.success('스크랩 상태가 변경되었습니다.')
      }
    } catch (error) {
      console.error('Failed to update scrap:', error)
      toast.alert('오류가 발생하였습니다.')
    } finally {
      setIsScrapLoading(false)
    }
  }

  return (
    <Link
      href={`/team/${announcement?.teamCode}/recruit/${announcement?.teamMemberAnnouncementId}`}
      className="flex cursor-pointer flex-col gap-3 rounded-lg border bg-grey10 px-[1.62rem] py-[1.38rem] hover:border-[#7EA5F8]"
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
    >
      <div className="flex justify-between">
        <span className="rounded-full bg-[#FFECF0] px-3 py-1 text-xs text-[#FF345F]">
          D-{announcement?.announcementDDay}
        </span>
        <Image
          src={isScrap ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
          alt="announcement-icon"
          width={20}
          height={20}
          onClick={handleScrap}
          className="cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-2">
        {announcement?.teamLogoImagePath ? (
          <div className="h-[22px] w-[22px] overflow-hidden rounded-lg">
            <Image
              src={announcement?.teamLogoImagePath}
              alt="announcement-icon"
              width={22}
              height={22}
              className="object-cover"
            />
          </div>
        ) : (
          <Image src="/common/default_profile.svg" alt="announcement-icon" width={22} height={22} />
        )}
        <span className="text-sm text-grey90">{announcement?.teamName}</span>
      </div>
      <div className="flex w-[90%] flex-col gap-1 ">
        <span className="text-lg font-semibold text-grey90">{announcement?.announcementTitle}</span>
        <span className="text-xs text-grey70">스크랩수 {scrapCount}</span>
      </div>

      <div className="flex gap-2">
        <div className="flex items-center rounded-[0.38rem] bg-[#D3E1FE] px-3 py-1 text-sm text-main">
          {announcement?.announcementPositionItem?.majorPosition}
        </div>
        {announcement?.announcementSkillNames?.slice(0, 1).map((skill, index) => (
          <div
            key={`skill-${index}`}
            className="flex items-center rounded-[0.38rem] bg-[#EDF3FF] px-3 py-1 text-sm text-main"
          >
            {skill?.announcementSkillName}
          </div>
        ))}
        {announcement?.announcementSkillNames?.length > 1 && (
          <div className="flex items-center rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-sm text-main">
            +{announcement?.announcementSkillNames.length - 1}
          </div>
        )}
      </div>
    </Link>
  )
}
