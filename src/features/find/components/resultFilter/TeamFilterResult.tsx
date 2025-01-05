'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MiniTeamCard_2 from '@/shared/components/MiniTeamCard_2'
import { getFindTeam } from '../../api/FindApi'
import { Team, TeamSearchParams } from '../../types/FindTypes'

export default function TeamFilterResult() {
  const searchParams = useSearchParams()
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalElements, setTotalElements] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // URL 파라미터에서 검색 조건 추출
        const params: TeamSearchParams = {
          scaleName: searchParams.getAll('scaleName'),
          isAnnouncement: searchParams.get('isAnnouncement') === 'true',
          cityName: searchParams.getAll('cityName'),
          teamStateName: searchParams.getAll('teamStateName'),
          page: Number(searchParams.get('page')) || 0,
          size: Number(searchParams.get('size')) || 20,
        }

        // API 호출
        const response = await getFindTeam(params)

        if (response.isSuccess && response.code === '1000') {
          setTeams(response.result.content)
          setTotalElements(response.result.totalElements)
        } else {
          setError(response.message)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '팀 정보를 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeams()
  }, [searchParams]) // searchParams가 변경될 때마다 API 호출

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

  if (teams.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>검색 결과가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="px-12">
      <div className="mb-4">
        <p className="text-sm text-grey70">총 {totalElements}개의 검색결과</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {teams.map((team, index) => (
          <MiniTeamCard_2
            key={`${team.teamName}-${index}`}
            team={{
              teamCurrentStates: team.teamCurrentStates,
              isTeamScrap: team.isTeamScrap,
              teamScrapCount: team.teamScrapCount,
              teamName: team.teamName,
              teamShortDescription: team.teamShortDescription,
              teamLogoImagePath: team.teamLogoImagePath,
              teamScaleItem: team.teamScaleItem,
              regionDetail: team.regionDetail,
            }}
          />
        ))}
      </div>
      {/* 필요한 경우 페이지네이션 컴포넌트 추가 */}
    </div>
  )
}
