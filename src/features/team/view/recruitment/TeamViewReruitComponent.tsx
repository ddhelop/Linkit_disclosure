import Image from 'next/image'
import { TeamAnnouncement } from '../../api/teamApi'
import Link from 'next/link'
import { useToast } from '@/shared/hooks/useToast'
import { useAuthStore } from '@/shared/store/useAuthStore'
import { useState } from 'react'
import { announcementScrap } from '@/shared/api/commonApi'
import { useRouter } from 'next/navigation'

export default function TeamViewReruitComponent({
  announcement,
  teamName,
}: {
  announcement: TeamAnnouncement
  teamName: string
}) {
  const toast = useToast()
  const { isLogin } = useAuthStore()
  const [isScrap, setIsScrap] = useState(announcement?.isAnnouncementScrap ?? false)
  const [isScrapLoading, setIsScrapLoading] = useState(false)
  const [scrapCount, setScrapCount] = useState(announcement?.announcementScrapCount ?? 0)
  const router = useRouter()

  const handleScrap = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault() // Link 컴포넌트의 기본 동작 방지
    if (isScrapLoading) return

    try {
      if (!isLogin) {
        toast.alert('로그인이 필요한 기능입니다.')
        router.push('/login')
        return
      }
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
      href={`/team/${teamName}/recruit/${announcement.teamMemberAnnouncementId}`}
      className="flex flex-col rounded-xl border border-transparent bg-white px-10 py-5 hover:border-main"
    >
      <div className="flex justify-between">
        <div
          className={`rounded-full px-3 py-1 text-xs ${
            announcement.isPermanentRecruitment ? 'bg-[#D3E1FE] text-main' : 'bg-[#FFECF0] text-[#FF345F]'
          }`}
        >
          {announcement.isPermanentRecruitment ? '상시 모집' : `D-${announcement.announcementDDay}`}
        </div>
        <div className="flex gap-2 text-[#4D82F3]">
          <Image
            src={isScrap ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
            alt="announcement-icon"
            width={20}
            height={20}
            onClick={handleScrap}
            className="cursor-pointer"
          />
          <span>{announcement.announcementScrapCount}</span>
        </div>
      </div>

      <span className="mt-3 text-xl font-semibold text-grey90">{announcement.announcementTitle}</span>

      <div className="flex gap-4">
        <div className="mt-5 rounded-[0.38rem] bg-[#D3E1FE] px-4 py-1 text-sm text-main">
          {announcement.majorPosition}
        </div>
        {announcement.announcementSkillNames.map((skill, index) => (
          <div key={index} className="mt-5 rounded-[0.38rem] bg-[#D3E1FE] px-4 py-1 text-sm text-main">
            {skill.announcementSkillName}
          </div>
        ))}
      </div>
    </Link>
  )
}
