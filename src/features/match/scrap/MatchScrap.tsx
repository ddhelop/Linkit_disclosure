'use client'

import { useState, useEffect } from 'react'
import MatchScrapFilter from './MatchScrapFilter'
import MiniProfileCard_2 from '@/shared/components/MiniProfileCard_2'
import { getAnnouncementScraps, getProfileScraps, getTeamScraps } from '../api/MatchApi'
import {
  AnnouncementScrapResponse,
  ProfileInform,
  TeamInformMenu,
  FilterType,
  AnnouncementInformMenu,
} from '../types/MatchTypes'
import MiniTeamCard_2 from '@/shared/components/MiniTeamCard_2'
import AnnouncementCard from '@/shared/components/AnnouncementCard'
import { Profile } from '@/shared/types/ProfileCardTypes'
import { Announcement, TeamCard, TeamData } from '@/features/team/types/team.types'

export default function MatchScrap() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('MEMBER')
  const [scrapData, setScrapData] = useState<Profile[] | TeamCard[] | Announcement[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchScrapData = async (filterType: FilterType) => {
    setIsLoading(true)
    try {
      if (filterType === 'MEMBER') {
        const data = await getProfileScraps()
        setScrapData(data.result.profileInformMenus)
      }
      if (filterType === 'TEAM') {
        const data = await getTeamScraps()
        setScrapData(data.result.teamInformMenus)
      }
      if (filterType === 'ANNOUNCEMENT') {
        const data = await getAnnouncementScraps()
        setScrapData(data)
      }
    } catch (error) {
      console.error('Error fetching scrap data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchScrapData(selectedFilter)
  }, [selectedFilter])

  return (
    <div className="flex w-full flex-col">
      <MatchScrapFilter selected={selectedFilter} onFilterChange={setSelectedFilter} />

      <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : selectedFilter === 'MEMBER' ? (
          Array.isArray(scrapData) && scrapData.length === 0 ? (
            <div className="col-span-2 mt-16 flex h-full w-full items-center justify-center">
              <span className="text-grey50">아직 스크랩한 프로필이 없어요</span>
            </div>
          ) : (
            (scrapData as Profile[]).map((profile) => <MiniProfileCard_2 key={profile.emailId} profile={profile} />)
          )
        ) : selectedFilter === 'TEAM' ? (
          Array.isArray(scrapData) && scrapData.length === 0 ? (
            <div className="col-span-2 mt-16 flex h-full items-center justify-center">
              <span className="text-grey50">아직 스크랩한 팀이 없어요</span>
            </div>
          ) : (
            (scrapData as TeamCard[]).map((team) => <MiniTeamCard_2 key={team.teamName} team={team} />)
          )
        ) : selectedFilter === 'ANNOUNCEMENT' ? (
          Array.isArray(scrapData) && scrapData.length === 0 ? (
            <div className="col-span-2 mt-16 flex h-full w-full items-center justify-center">
              <span className="text-grey50">아직 스크랩한 공고가 없어요</span>
            </div>
          ) : (
            (scrapData as Announcement[]).map((announcement) => (
              <AnnouncementCard key={announcement.teamMemberAnnouncementId} announcement={announcement} />
            ))
          )
        ) : null}
      </div>
    </div>
  )
}
