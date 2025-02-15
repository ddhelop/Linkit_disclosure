'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MiniProfileCard_2 from '@/shared/components/MiniProfileCard_2'
import { getFindPrivateProfile } from '../../api/FindApi'
import { ProfileInform } from '@/features/match/types/MatchTypes'
import { Profile, SearchParams } from '../../types/FindTypes'

export default function PrivateFilterResult() {
  const searchParams = useSearchParams()
  const [profiles, setProfiles] = useState<Profile[]>([])
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
          profileStateName: searchParams.get('profileStateName') || undefined,
          page: currentPage,
          size: 20,
        }

        // API 호출
        const response = await getFindPrivateProfile(params)

        if (response.isSuccess && response.code === '1000') {
          setProfiles(response.result.content)
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

  if (profiles.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>검색 결과가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="xl:px-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {profiles.map((profile, index) => (
          <MiniProfileCard_2 key={`${profile.emailId}-${index}`} profile={profile} />
        ))}
      </div>
      {/* 필요한 경우 페이지네이션 컴포넌트 추가 */}
    </div>
  )
}
