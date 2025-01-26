'use client'

import { useEffect, useState } from 'react'
import TeamEditRecruitComponent from './TeamEditRecruitComponent'
import { getTeamAnnouncements } from '../../api/teamApi'
import type { TeamAnnouncement } from '../../api/teamApi'
import NotContentsUi from '@/features/profile/edit/components/common/NotContentsUi'

export default function TeamEditRecruitList({ params }: { params: { teamName: string } }) {
  const [announcements, setAnnouncements] = useState<TeamAnnouncement[]>([])
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all')

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getTeamAnnouncements(params.teamName)
        setAnnouncements(response.result.teamMemberAnnouncementItems)
      } catch (error) {
        console.error('Failed to fetch announcements:', error)
      }
    }

    fetchAnnouncements()
  }, [params.teamName])

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (filter === 'all') return true
    if (filter === 'ongoing') return announcement.isAnnouncementInProgress
    return !announcement.isAnnouncementInProgress
  })

  return (
    <div className="flex flex-col">
      {/* 필터링 */}
      <div className="mt-5 flex gap-3">
        <div
          onClick={() => setFilter('all')}
          className={`cursor-pointer rounded-[62.5rem] border border-[#B5CDFF] px-6 py-2 text-grey60 
            ${filter === 'all' ? 'bg-[#D3E1FE]' : 'bg-white'}`}
        >
          전체
        </div>
        <div
          onClick={() => setFilter('ongoing')}
          className={`cursor-pointer rounded-[62.5rem] border border-[#B5CDFF] px-6 py-2 text-grey60
            ${filter === 'ongoing' ? 'bg-[#D3E1FE]' : 'bg-white'}`}
        >
          모집중
        </div>
        <div
          onClick={() => setFilter('completed')}
          className={`cursor-pointer rounded-[62.5rem] border border-[#B5CDFF] px-6 py-2 text-grey60
            ${filter === 'completed' ? 'bg-[#D3E1FE]' : 'bg-white'}`}
        >
          모집완료
        </div>
      </div>

      {/* 리스트 */}
      <div className="mt-6 flex flex-col gap-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <TeamEditRecruitComponent
              key={announcement.teamMemberAnnouncementId}
              announcement={announcement}
              teamName={params.teamName}
              onDelete={() => {
                setAnnouncements((prev) =>
                  prev.filter((a) => a.teamMemberAnnouncementId !== announcement.teamMemberAnnouncementId),
                )
              }}
            />
          ))
        ) : (
          <NotContentsUi />
        )}
      </div>
    </div>
  )
}
