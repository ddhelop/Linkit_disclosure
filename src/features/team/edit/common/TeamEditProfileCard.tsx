'use client'

import Image from 'next/image'
import { getTeamInfo } from '../../api/teamApi'
import { useEffect, useState } from 'react'
import { TeamInfoResponse } from '../../types/team.types'

export default function TeamEditProfileCard({ params }: { params: { teamName: string } }) {
  const [teamInfo, setTeamInfo] = useState<TeamInfoResponse | null>(null)

  useEffect(() => {
    const fetchTeamInfo = async () => {
      const teamInfo = await getTeamInfo(params.teamName)
      setTeamInfo(teamInfo)
    }
    fetchTeamInfo()
  }, [params.teamName])

  return (
    <div className="flex gap-4 rounded-xl border border-grey40 bg-[#FCFCFD] p-4">
      <Image
        src={teamInfo?.result.teamInformMenu.teamLogoImagePath ?? '/common/default_profile.svg'}
        width={80}
        height={80}
        alt="team-default-logo"
        className="rounded-xl"
      />

      <div className="flex flex-col justify-center">
        <span className="text-lg font-semibold text-grey90">{teamInfo?.result.teamInformMenu.teamName}</span>

        <div className="mt-2 flex flex-col gap-1">
          <span className="flex gap-2 text-xs text-grey60">
            팀원 | <span className="text-grey70">{teamInfo?.result.teamInformMenu.teamScaleItem.teamScaleName}</span>
          </span>

          <span className="flex gap-2 text-xs text-grey60">
            지역 | <span className="text-grey70">{teamInfo?.result.teamInformMenu.regionDetail.cityName}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
