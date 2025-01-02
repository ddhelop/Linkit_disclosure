'use client'

import { useState, useEffect } from 'react'
import MatchScrapFilter from './MatchScrapFilter'
import MiniProfileCard_2 from '@/shared/components/MiniProfileCard_2'
import { getProfileScraps } from '../api/MatchApi'
import { ProfileInform } from '../types/MatchTypes'

type FilterType = 'MEMBER' | 'TEAM' | 'RECRUITMENT'

export default function MatchScrap() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('MEMBER')
  const [scrapData, setScrapData] = useState<ProfileInform[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchScrapData = async (filterType: FilterType) => {
    setIsLoading(true)
    try {
      if (filterType === 'MEMBER') {
        const data = await getProfileScraps()
        setScrapData(data)
      }
      // TODO: 팀과 모집공고 API 추가 예정
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
        ) : (
          scrapData.map((profile) => <MiniProfileCard_2 key={profile.emailId} profile={profile} />)
        )}
      </div>
    </div>
  )
}
