'use client'

import Image from 'next/image'
import { useState } from 'react'
import { announcementScrap } from '../api/commonApi'
import Link from 'next/link'
import { useToast } from '../hooks/useToast'
import { useAuthStore } from '../store/useAuthStore'
import { useRouter } from 'next/navigation'
import { Announcement } from '@/features/team/types/team.types'

export default function AnnouncementCard({
  announcement,
  variant,
}: {
  announcement: Announcement
  variant?: 'narrow' | 'wide'
}) {
  const [isScrapLoading, setIsScrapLoading] = useState(false)
  const [scrapCount, setScrapCount] = useState(announcement.announcementScrapCount || 0)

  const { isLogin } = useAuthStore()
  const toast = useToast()
  const router = useRouter()

  const handleScrap = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault()
    if (isScrapLoading) return

    try {
      if (!isLogin) {
        toast.alert('로그인이 필요한 기능입니다.')
        router.push('/login')
        return
      }
      setIsScrapLoading(true)
      const response = await announcementScrap(
        announcement?.teamMemberAnnouncementId,
        !announcement.isAnnouncementScrap,
      )
      if (response.ok) {
        announcement.isAnnouncementScrap = !announcement.isAnnouncementScrap

        setScrapCount((prev) => (!announcement.isAnnouncementScrap ? prev + 1 : prev - 1))
        toast.success(!announcement.isAnnouncementScrap ? '스크랩이 완료되었어요.' : '스크랩이 취소되었어요.')
      }
    } catch (error) {
      toast.alert('오류가 발생하였습니다.')
    } finally {
      setIsScrapLoading(false)
    }
  }

  return (
    <Link
      href={`/team/${announcement?.teamCode}/recruit/${announcement?.teamMemberAnnouncementId}`}
      className={
        variant == 'wide'
          ? 'flex min-w-[17rem] cursor-pointer flex-col gap-3 border-b border-grey40 px-10 py-6 last:border-none hover:bg-grey10 md:min-w-[unset]'
          : 'shadow-announcement flex min-w-[17rem] cursor-pointer flex-col gap-3 rounded-lg border bg-grey10 px-[1.62rem] py-[1.38rem] hover:border-[#7EA5F8] md:min-w-[unset]'
      }
    >
      <div className="flex justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs  ${
            announcement?.isPermanentRecruitment ? 'bg-[#D3E1FE] text-[#4D82F3]' : 'bg-[#FFECF0] text-[#FF345F]'
          }`}
        >
          {announcement?.isPermanentRecruitment
            ? '상시 모집'
            : announcement?.isClosed
              ? '마감'
              : `D-${announcement?.announcementDDay}`}
        </span>
        <Image
          src={announcement.isAnnouncementScrap ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
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

      <div className="text-xs text-grey60">{announcement.createdAt}</div>

      <div className="flex w-[90%] flex-col gap-1 ">
        <span className="line-clamp-2 text-lg font-semibold text-grey90">{announcement?.announcementTitle}</span>
      </div>

      <div className="flex gap-2">
        <div className="flex items-center rounded-[0.38rem] bg-[#D3E1FE] px-3 py-1 text-sm text-main">
          {announcement?.announcementPositionItem?.subPosition}
        </div>
      </div>

      <div>
        <span className="text-xs text-grey70">조회수 {announcement.viewCount}</span>
      </div>
    </Link>
  )
}
