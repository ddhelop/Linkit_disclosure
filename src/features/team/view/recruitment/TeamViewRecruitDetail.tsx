'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getTeamAnnouncementDetail } from '../../api/teamViewApi'
import { TeamAnnouncement, TeamAnnouncementDetail } from '../../api/teamApi'

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

export default function TeamViewRecruitDetail({ teamName, id }: { teamName: string; id: string }) {
  const [data, setData] = useState<TeamAnnouncementDetail | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeamAnnouncementDetail(teamName, id)
      setData(response.result)
    }
    fetchData()
  }, [teamName, id])

  return (
    <div className="flex flex-col rounded-xl border border-grey30 bg-white px-[3.38rem] py-10">
      <div className="flex justify-between">
        <div className="rounded-full bg-[#FFECF0] px-3 py-1 text-xs text-[#FF345F]">
          {data && calculateDday(data.announcementEndDate)}
        </div>
        <div className="flex gap-2">
          <Image src="/common/icons/save.svg" alt="save" width={20} height={20} className="cursor-pointer" />
          <span className="text-main">데이터반환필요</span>
        </div>
      </div>

      <span className="mt-3 text-2xl font-semibold text-grey90">{data && data.announcementTitle}</span>

      <div className="mt-3 flex gap-3">
        <div className="rounded-[0.38rem] bg-[#D3E1FE] px-4 py-1 text-sm text-[#2563EB]">
          {data && data.announcementPositionItem.majorPosition}
        </div>
        {/*  */}
        {data?.announcementSkillNames.map((skill) => (
          <div
            key={skill.announcementSkillName}
            className="rounded-[0.38rem] bg-[#EDF3FF] px-4 py-1 text-sm text-[#2563EB]"
          >
            {skill.announcementSkillName}
          </div>
        ))}

        {/*  */}
      </div>

      {/* 내용 */}
      <div className="mt-[3.62rem] flex flex-col gap-12">
        {data?.mainTasks && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">주요업무</h3>
            <span className="mt-3 pl-1 text-grey80">{data.mainTasks}</span>
          </div>
        )}

        {data?.benefits && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">혜택</h3>
            <span className="mt-3 pl-1 text-grey80">{data.benefits}</span>
          </div>
        )}

        {data?.idealCandidate && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">이런 분을 찾습니다</h3>
            <span className="mt-3 pl-1 text-grey80">{data.idealCandidate}</span>
          </div>
        )}

        {data?.preferredQualifications && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">우대사항</h3>
            <span className="mt-3 pl-1 text-grey80">{data.preferredQualifications}</span>
          </div>
        )}

        {data?.joiningProcess && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">합류 과정</h3>
            <span className="mt-3 pl-1 text-grey80">{data.joiningProcess}</span>
          </div>
        )}

        {data?.workMethod && (
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-grey90">근무 방식</h3>
            <span className="mt-3 pl-1 text-grey80">{data.workMethod}</span>
          </div>
        )}
      </div>
    </div>
  )
}
