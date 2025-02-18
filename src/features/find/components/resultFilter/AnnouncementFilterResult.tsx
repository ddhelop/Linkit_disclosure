'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getFindAnnouncement } from '../../api/FindApi'

import { Announcement, SearchParams } from '../../types/FindTypes'
import AnnouncementCard from '@/shared/components/AnnouncementCard'

export default function PrivateFilterResult() {
  const searchParams = useSearchParams()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [hotAnnouncements, setHotAnnouncements] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalElements, setTotalElements] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // URL 파라미터에서 검색 조건 추출
        const params: SearchParams = {
          subPosition: searchParams.getAll('subPosition'),
          skillName: searchParams.getAll('skillName'),
          cityName: searchParams.get('cityName') || undefined,
          scale: searchParams.get('scale') || undefined,
          page: currentPage,
          size: 20,
        }

        // API 호출
        const response = await getFindAnnouncement(params)

        if (response.isSuccess && response.code === '1000') {
          setAnnouncements(response.result.defaultAnnouncements.content)
          setHotAnnouncements(response.result.hotAnnouncements)
          setTotalElements(response.result.defaultAnnouncements.totalElements)
        } else {
          setError(response.message)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '프로필을 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfiles()
  }, [searchParams, currentPage]) // searchParams나 currentPage가 변경될 때마다 API 호출

  const isFilterApplied = () => {
    return (
      searchParams.getAll('subPosition').length > 0 ||
      searchParams.getAll('skillName').length > 0 ||
      searchParams.has('cityName') ||
      searchParams.has('scale')
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>로딩 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (announcements.length === 0 && hotAnnouncements.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>검색 결과가 없습니다.</p>
      </div>
    )
  }

  return (

    <div className="flex flex-col gap-12 px-12">
      {hotAnnouncements.length > 0 && (
        <div>
          <div className="text-lg font-semibold text-black">🔥 지급 핫한 공고예요!</div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-3">
            {hotAnnouncements.map((announcement, index) => (
              <AnnouncementCard key={`announcement-${index}`} announcement={announcement} />
            ))}
          </div>
        </div>
      )}

      {/* 공고 리스트 */}
      {announcements.length > 0 && (
        <div>
          <div className="text-lg font-semibold text-black">

            {isFilterApplied() ? '검색 결과' : '🔍 나에게 맞는 모집 공고를 더 찾아보세요!'}

          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 xl:grid-cols-3">
            {announcements.map((announcement, index) => (
              <AnnouncementCard key={`announcement-${index}`} announcement={announcement} />
            ))}
          </div>
        </div>
      )}
      {/* 필요한 경우 페이지네이션 컴포넌트 추가 */}
    </div>
  )
}
