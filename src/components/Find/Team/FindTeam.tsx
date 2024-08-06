'use client'
import TeamMiniProfile from './TeamMiniProfile'
import { useRecoilValue } from 'recoil'
import { filteredTeamsState } from '@/context/recoil-context'

export default function FindTeam() {
  const teamData = useRecoilValue(filteredTeamsState)

  return (
    <div className="flex w-full flex-col gap-4 lg:pt-[2rem]">
      {teamData?.map((team) => <TeamMiniProfile key={team?.teamMiniProfileResponse.id} profile={team} />)}
    </div>
  )
}
