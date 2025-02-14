'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getFindAnnouncement } from '../../api/FindApi'

import { Announcement, SearchParams } from '../../types/FindTypes'
import AnnouncementCard from '@/shared/components/AnnouncementCard'

export default function PrivateFilterResult() {
  const searchParams = useSearchParams()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
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
          setAnnouncements(response.result.content)
          setTotalElements(response.result.totalElements)
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

  if (announcements.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>검색 결과가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="md:px-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement, index) => (
          <AnnouncementCard key={`announcement-${index}`} announcement={announcement} />
        ))}
      </div>
      {/* 필요한 경우 페이지네이션 컴포넌트 추가 */}
    </div>
  )
}
