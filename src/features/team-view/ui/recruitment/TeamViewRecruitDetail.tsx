'use client'

import { Announcement } from '@/features/team/types/team.types'
import { announcementScrap } from '@/shared/api/commonApi'
import { useToast } from '@/shared/hooks/useToast'
import { useAuthStore } from '@/shared/store/useAuthStore'
import Linkify from 'linkify-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

function calculateDday(endDate: string): string {
  const today = new Date()
  const end = new Date(endDate)
  today.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  const diffTime = end.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return '마감'
  if (diffDays === 0) return 'D-Day'
  return `D-${diffDays}`
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}년 ${month}월 ${day}일`
}

export default function TeamViewRecruitDetail({
  recruitmentDetail,
  isTeamManager,
}: {
  recruitmentDetail: Announcement
  isTeamManager: boolean
}) {
  const [isScraped, setIsScraped] = useState(recruitmentDetail?.isAnnouncementScrap)
  const [scrapCount, setScrapCount] = useState(recruitmentDetail?.announcementScrapCount)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()
  const { isLogin } = useAuthStore()
  const { teamName, id } = useParams()

  const handleScrap = async () => {
    if (!isLogin) {
      toast.alert('로그인이 필요한 기능입니다.')
      router.push('/login')
      return
    }

    if (isLoading) return

    try {
      setIsLoading(true)
      const response = await announcementScrap(recruitmentDetail?.teamMemberAnnouncementId, !isScraped)

      if (response.ok) {
        setIsScraped(!isScraped)
        setScrapCount((prev) => (isScraped ? prev - 1 : prev + 1))
        toast.success(isScraped ? '스크랩이 취소되었습니다.' : '스크랩 되었습니다.')
      } else {
        toast.alert('스크랩 처리에 실패했습니다.')
      }
    } catch (error) {
      console.error('Scrap error:', error)
      toast.alert('스크랩 처리 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="group flex flex-col rounded-xl border-grey30 bg-white px-6 py-8 lg:border lg:px-8">
      <div className="flex justify-between">
        <div
          className={`rounded-full  px-3 py-1 text-xs  ${
            recruitmentDetail?.isPermanentRecruitment ? 'bg-[#D3E1FE] text-[#2563EB]' : 'bg-[#FFECF0] text-[#FF345F]'
          }`}
        >
          {recruitmentDetail?.isPermanentRecruitment
            ? '상시 모집'
            : calculateDday(recruitmentDetail?.announcementEndDate ?? '')}
        </div>
        {/* 스크랩 */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-grey70">스크랩 수 {scrapCount}</span>
          <Image
            src={isScraped ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
            alt="save"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleScrap}
          />
        </div>
      </div>

      <span className="mt-3 text-xs text-grey70">{formatDate(recruitmentDetail?.createdAt)} 업로드</span>
      <div className="flex items-start justify-between">
        <div className="mt-1 flex flex-col gap-1">
          <span className="text-2xl font-semibold text-grey90">{recruitmentDetail?.announcementTitle}</span>
          <span className="text-xs text-grey70">조회수 {recruitmentDetail?.viewCount}</span>
        </div>

        {isTeamManager && (
          <Link
            href={`/team/${teamName}/edit/recruit/new?id=${id}`}
            className="opacity-0 duration-150 lg:group-hover:opacity-100"
          >
            <Image src="/common/icons/editable.svg" alt="edit" width={26} height={26} />
          </Link>
        )}
      </div>

      {/* 포지션 */}
      <div className="mt-3 flex gap-2">
        <div className="rounded-[0.38rem] bg-[#D3E1FE] px-4 py-1 text-sm text-[#2563EB]">
          {recruitmentDetail?.announcementPositionItem?.majorPosition}
        </div>
        <div className="rounded-[0.38rem] bg-[#D3E1FE] px-4 py-1 text-sm text-[#2563EB]">
          {recruitmentDetail?.announcementPositionItem?.subPosition}
        </div>
      </div>

      {/* 기술 스택 */}
      <div className="mt-2 flex gap-2">
        {recruitmentDetail?.announcementSkillNames?.map((skill) => (
          <div
            key={skill?.announcementSkillName}
            className="rounded-[0.38rem] bg-[#EDF3FF] px-4 py-1 text-sm text-[#2563EB]"
          >
            {skill?.announcementSkillName}
          </div>
        ))}
      </div>

      {/* 내용 */}
      <div className="mt-[3.62rem] flex flex-col gap-12">
        {recruitmentDetail?.mainTasks && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">주요업무</h3>

            <span className="mt-3 whitespace-pre-wrap pl-1 text-grey80">
              <Linkify options={{ className: 'text-[#2563EB] hover:underline' }}>
                {recruitmentDetail?.mainTasks}
              </Linkify>
            </span>
          </div>
        )}

        {recruitmentDetail?.idealCandidate && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">요구 사항</h3>

            <span className="mt-3 whitespace-pre-wrap pl-1 text-grey80">
              <Linkify options={{ className: 'text-[#2563EB] hover:underline' }}>
                {recruitmentDetail?.idealCandidate}
              </Linkify>
            </span>
          </div>
        )}

        {recruitmentDetail?.workMethod && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">업무 방식</h3>

            <span className="mt-3 whitespace-pre-wrap pl-1 text-grey80">
              <Linkify options={{ className: 'text-[#2563EB] hover:underline' }}>
                {recruitmentDetail?.workMethod}
              </Linkify>
            </span>
          </div>
        )}

        {recruitmentDetail?.preferredQualifications && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">우대 사항</h3>
            <span className="mt-3 whitespace-pre-wrap pl-1 text-grey80">
              <Linkify options={{ className: 'text-[#2563EB] hover:underline' }}>
                {recruitmentDetail?.preferredQualifications}
              </Linkify>
            </span>
          </div>
        )}

        {recruitmentDetail?.joiningProcess && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">합류 절차</h3>

            <span className="mt-3 whitespace-pre-wrap pl-1 text-grey80">
              <Linkify options={{ className: 'text-[#2563EB] hover:underline' }}>
                {recruitmentDetail?.joiningProcess}
              </Linkify>
            </span>
          </div>
        )}

        {recruitmentDetail?.benefits && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">기타 사항</h3>

            <span className="mt-3 whitespace-pre-wrap pl-1 text-grey80">
              <Linkify options={{ className: 'text-[#2563EB] hover:underline' }}>{recruitmentDetail?.benefits}</Linkify>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
