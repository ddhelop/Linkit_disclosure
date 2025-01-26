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

export default function MatchScrap() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('MEMBER')
  const [scrapData, setScrapData] = useState<ProfileInform[] | TeamInformMenu[] | AnnouncementInformMenu[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchScrapData = async (filterType: FilterType) => {
    setIsLoading(true)
    try {
      if (filterType === 'MEMBER') {
        const data = await getProfileScraps()
        setScrapData(data)
      }
      if (filterType === 'TEAM') {
        const data = await getTeamScraps()
        setScrapData(data)
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
    <div className="flex flex-col">
      <MatchScrapFilter selected={selectedFilter} onFilterChange={setSelectedFilter} />

      <div className="mt-8 grid grid-cols-2 gap-4">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : selectedFilter === 'MEMBER' ? (
          Array.isArray(scrapData) &&
          (scrapData as ProfileInform[]).map((profile) => <MiniProfileCard_2 key={profile.emailId} profile={profile} />)
        ) : selectedFilter === 'TEAM' ? (
          Array.isArray(scrapData) &&
          (scrapData as TeamInformMenu[]).map((team) => <MiniTeamCard_2 key={team.teamName} team={team} />)
        ) : selectedFilter === 'ANNOUNCEMENT' ? (
          Array.isArray(scrapData) &&
          (scrapData as AnnouncementInformMenu[]).map((announcement) => (
            <AnnouncementCard key={announcement.teamMemberAnnouncementId} announcement={announcement} />
          ))
        ) : null}
      </div>
    </div>
  )
}
