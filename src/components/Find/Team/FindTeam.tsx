'use client'
import { GetTeams } from '@/lib/action'
import TeamMemberMiniProfile from '../../units/TeamMemberMiniProfile'
import { useEffect, useState } from 'react'
import { TeamProfile } from '@/lib/types'

export default function FindTeam() {
  const [TeamData, setTeamData] = useState<TeamProfile[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetTeams()
      setTeamData(data.content)
    }
    fetchData()
  }, []) // 빈 배열을 의존성 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  return (
    <div className="flex w-full flex-col gap-4 pt-[2rem]">
      {TeamData?.map((team) => <TeamMemberMiniProfile key={team.id} profile={team} />)}
    </div>
  )
}
