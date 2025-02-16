'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MiniTeamCard_2 from '@/shared/components/MiniTeamCard_2'
import { getFindTeam } from '../../api/FindApi'
import { Team, TeamSearchParams } from '../../types/FindTypes'

export default function TeamFilterResult() {
  const searchParams = useSearchParams()
  const [teams, setTeams] = useState<Team[]>([])
  const [ventureTeams, setVentureTeams] = useState<Team[]>([])
  const [supportProjectTeams, setSupportProjectTeams] = useState<Team[]>([])
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
          setTeams(response.result.defaultTeams.content)
          setVentureTeams(response.result.ventureTeams)
          setSupportProjectTeams(response.result.supportProjectTeams)
          setTotalElements(response.result.defaultTeams.totalElements)
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

  const isFilterApplied = () => {
    return (
      searchParams.getAll('scaleName').length > 0 ||
      searchParams.get('isAnnouncement') !== null ||
      searchParams.getAll('cityName').length > 0 ||
      searchParams.getAll('teamStateName').length > 0
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

  if (teams?.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>검색 결과가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-16 px-12">
      {/* 벤처 팀 */}
      {ventureTeams?.length > 0 && (
        <div>
          <div className="text-lg font-semibold text-black">🔥 창업을 위한 팀원을 찾고 있어요!</div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 ">
            {ventureTeams?.map((team, index) => <MiniTeamCard_2 key={`${team.teamName}-${index}`} team={team} />)}
          </div>
        </div>
      )}

      {/* 지원 사업 팀 */}
      {supportProjectTeams?.length > 0 && (
        <div>
          <div className="text-lg font-semibold text-black">🔥 지원 사업을 위한 팀원을 찾고 있어요!</div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {supportProjectTeams?.map((team, index) => (
              <MiniTeamCard_2 key={`${team.teamName}-${index}`} team={team} />
            ))}
          </div>
        </div>
      )}

      {/* 팀 리스트 */}
      {teams?.length > 0 && (
        <div>
          <div className="text-lg font-semibold text-black">
            {isFilterApplied() ? '검색 결과' : '🔍 나에게 필요한 팀을 더 찾아보세요!'}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {teams?.map((team, index) => <MiniTeamCard_2 key={`${team.teamName}-${index}`} team={team} />)}
          </div>
        </div>
      )}
      {/* 필요한 경우 페이지네이션 컴포넌트 추가 */}
    </div>
  )
}
