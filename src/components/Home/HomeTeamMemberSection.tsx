'use client'
import { useEffect, useState } from 'react'
import { getTeamMemberRecommend } from './api/HomeApi'
import { ProfileInform } from '@/features/match/types/MatchTypes'
import MiniProfileCard_2 from '@/shared/components/MiniProfileCard_2'

export default function HomeTeamMemberSection() {
  const [teamMemberRecommend, setTeamMemberRecommend] = useState<ProfileInform[]>([])

  useEffect(() => {
    const fetchTeamRecommend = async () => {
      const response = await getTeamMemberRecommend()
      setTeamMemberRecommend(response.result.profileInformMenus)
    }
    fetchTeamRecommend()
  }, [])
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-xl font-semibold">이런 팀원은 어때요?</h1>

      <div className="grid grid-cols-3 gap-6">
        {teamMemberRecommend.map((profile) => (
          <MiniProfileCard_2 key={profile.emailId} profile={profile} />
        ))}
      </div>
    </div>
  )
}
