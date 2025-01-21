'use client'

import MiniTeamCard_2 from '@/shared/components/MiniTeamCard_2'
import { useEffect, useState } from 'react'
import { getTeamRecommend } from './api/HomeApi'
import { Team } from '@/features/find/types/FindTypes'

export default function HomeTeamSection() {
  const [teamRecommend, setTeamRecommend] = useState<Team[]>([])

  useEffect(() => {
    const fetchTeamRecommend = async () => {
      const response = await getTeamRecommend()
      setTeamRecommend(response.result.teamInformMenus)
    }
    fetchTeamRecommend()
  }, [])

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold">팀원으로 합류해 보세요</h1>

      <div className="grid grid-cols-2 gap-6">
        {teamRecommend.map((team) => (
          <MiniTeamCard_2 key={team.teamCode} team={team} />
        ))}
      </div>
    </div>
  )
}
