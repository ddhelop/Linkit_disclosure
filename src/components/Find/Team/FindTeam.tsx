'use client'
import { GetTeams } from '@/lib/action'
import { useEffect, useState } from 'react'
import TeamMiniProfile from './TeamMiniProfile'

interface TeamProfile {
  teamMiniProfileResponse: {
    id: number
    sectorName: string
    sizeType: string
    teamName: string
    teamProfileTitle: string
    isTeamActivate: boolean
    teamLogoImageUrl: string
    teamKeywordNames: string[]
  }
  teamMemberAnnouncementResponse: {
    id: number
    teamName: string
    jobRoleNames: string[]
    mainBusiness: string
    skillNames: string[]
    applicationProcess: string
  }
}

export default function FindTeam() {
  const [teamData, setTeamData] = useState<TeamProfile[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetTeams()
      console.log(data)
      setTeamData(data.content)
    }
    fetchData()
  }, []) // 빈 배열을 의존성 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  return (
    <div className="flex w-full flex-col gap-4 pt-[2rem]">
      {teamData?.map((team) => <TeamMiniProfile key={team.teamMiniProfileResponse.id} profile={team} />)}
    </div>
  )
}
