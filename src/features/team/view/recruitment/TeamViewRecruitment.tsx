'use client'
import { useEffect, useState } from 'react'

import { getTeamAnnouncements, TeamAnnouncement } from '../../api/teamApi'
import TeamViewReruitComponent from './TeamViewReruitComponent'
import TeamViewNotView from '../common/TeamViewNotView'

export default function TeamViewRecruitment({ teamName }: { teamName: string }) {
  const [data, setData] = useState<TeamAnnouncement[] | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'IN_PROGRESS' | 'CLOSED'>('ALL')

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeamAnnouncements(teamName)
      setData(response.result.teamMemberAnnouncementItems)
    }
    fetchData()
  }, [teamName])

  const filteredAnnouncements = data?.filter((announcement) => {
    switch (filter) {
      case 'IN_PROGRESS':
        return announcement.isAnnouncementInProgress
      case 'CLOSED':
        return !announcement.isAnnouncementInProgress
      default:
        return true
    }
  })

  if (!data || data.length === 0) {
    return <TeamViewNotView />
  }

  return (
    <>
      <div className="mt-12 flex gap-3">
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
        <div className="mt-8 flex flex-col gap-6 pb-10">
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
