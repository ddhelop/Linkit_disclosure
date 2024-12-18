'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TeamItem from './TeamItem'
import { getMyTeams } from './api/teamApi'
import { TeamInformation } from './types/team.types'

export default function TeamSelect() {
  const router = useRouter()
  const [teams, setTeams] = useState<TeamInformation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getMyTeams()
        setTeams(response.result.teamInformMenus)
      } catch (err) {
        setError('팀 정보를 불러오는데 실패했습니다.')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (isLoading) return <div>로딩중...</div>
  if (error) return <div>{error}</div>

  return (
    <>
      {teams.length === 0 ? (
        <div className="mt-[1.62rem] flex w-full flex-col items-center justify-center gap-8 rounded-[1.88rem] border border-grey30 bg-grey10 px-6 py-8">
          <div className="flex w-full flex-col items-center">
            <span className="font-semibold text-grey90">앗! 아직 팀프로필이 없어요</span>
            <span className="text-xs font-normal text-grey60">정보를 입력하고 팀을 생성해 보세요</span>
          </div>
        </div>
      ) : (
        <div className="mt-[1.63rem] flex flex-col gap-4">
          {teams.map((team, index) => (
            <TeamItem
              key={index}
              team={team}
              onClick={() => {
                router.push(`/team/${encodeURIComponent(team.teamName)}/log`)
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}
