'use client'
import { useState } from 'react'
import TeamViewNotView from '../teamInfo/TeamViewNotView'
import { useQuery } from '@tanstack/react-query'
import { getTeamRecruitmentList } from '@/features/team-view/api/TeamDataViewApi'
import Link from 'next/link'
import Image from 'next/image'
import TeamViewReruitComponent from './TeamViewReruitComponent'

export default function TeamViewRecruitment({ teamName }: { teamName: string }) {
  const [filter, setFilter] = useState<'ALL' | 'IN_PROGRESS' | 'CLOSED'>('ALL')

  const { data } = useQuery({
    queryKey: ['teamRecruitment', teamName],
    queryFn: () => getTeamRecruitmentList(teamName),
  })
  const announcements = data?.result.teamMemberAnnouncementItems

  const filteredAnnouncements = announcements?.filter((announcement) => {
    switch (filter) {
      case 'IN_PROGRESS':
        return !announcement.isClosed
      case 'CLOSED':
        return announcement.isClosed
      default:
        return true
    }
  })

  if (!announcements || announcements.length === 0) {
    return data?.result.isTeamManager ? (
      <TeamViewNotView url="recruit" />
    ) : (
      <div className="mt-[3rem] flex w-full flex-col items-center font-semibold text-grey60">
        아직 작성한 내용이 없어요
      </div>
    )
  }

  return (
    <>
      {/* 팀 로그 제목 및 수정하기 */}
      {data?.result.isTeamManager && (
        <div className="mt-7 flex w-full items-center justify-between">
          <h3 className="text-xl text-grey80">모집 공고</h3>
          <Link
            href={`/team/${teamName}/edit/recruit`}
            className="flex items-center gap-2 rounded-full bg-grey80 px-6 py-3 text-sm text-white hover:brightness-125"
          >
            <Image src={'/common/icons/white_pencil.svg'} alt="pencil" width={16} height={16} />
            <span>수정하기</span>
          </Link>
        </div>
      )}
      <div className=" mt-6 flex gap-3">
        <div
          className={`cursor-pointer rounded-full px-6 py-2 ${
            filter === 'ALL' ? 'bg-[#4871E6] text-white' : 'bg-[#D3E1FE] text-grey60'
          }`}
          onClick={() => setFilter('ALL')}
        >
          전체
        </div>
        <div
          className={`cursor-pointer rounded-full px-6 py-2 ${
            filter === 'IN_PROGRESS' ? 'bg-[#4871E6] text-white' : 'bg-[#D3E1FE] text-grey60'
          }`}
          onClick={() => setFilter('IN_PROGRESS')}
        >
          진행 중
        </div>
        <div
          className={`cursor-pointer rounded-full px-6 py-2 ${
            filter === 'CLOSED' ? 'bg-[#4871E6] text-white' : 'bg-[#D3E1FE] text-grey60'
          }`}
          onClick={() => setFilter('CLOSED')}
        >
          마감
        </div>
      </div>
      {filteredAnnouncements && filteredAnnouncements.length > 0 ? (
        <div className="mt-8 flex flex-col gap-3 pb-10 lg:gap-6">
          {filteredAnnouncements.map((announcement) => (
            <TeamViewReruitComponent
              key={announcement.teamMemberAnnouncementId}
              announcement={announcement}
              teamName={teamName}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 text-center text-grey60">
          {filter === 'IN_PROGRESS' && '진행 중인 공고가 없어요!'}
          {filter === 'CLOSED' && '마감된 공고가 없어요!'}
          {filter === 'ALL' && '등록된 공고가 없어요!'}
        </div>
      )}
    </>
  )
}
