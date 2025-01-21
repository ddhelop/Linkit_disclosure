'use client'

import MiniTeamCard from '@/shared/components/MiniTeamCard'

import { getTeamInfo } from '@/features/team/api/teamApi'
import TeamViewRecruitDetail from '@/features/team/view/recruitment/TeamViewRecruitDetail'
import { useEffect, useState } from 'react'
import { TeamInfoResponse } from '@/features/team/types/team.types'

export default function TeamViewRecruitDetailPage({ params }: { params: { teamName: string; id: string } }) {
  const [teamInfo, setTeamInfo] = useState<TeamInfoResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeamInfo(params.teamName)
      setTeamInfo(response)
    }
    fetchData()
  }, [])

  return (
    <div className="absolute left-0 flex h-[calc(100vh-4rem)] w-full justify-center bg-[#FCFCFD] pt-[3.63rem]">
      <div className="flex w-[83%] justify-center gap-8">
        <div className="w-[49rem]">
          <TeamViewRecruitDetail teamName={params.teamName} id={params.id} />
        </div>
        <div>
          <MiniTeamCard teamInfo={teamInfo} />
        </div>
      </div>
    </div>
  )
}
