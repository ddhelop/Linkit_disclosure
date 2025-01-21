'use client'

import { teamScrap } from '@/features/team/api/teamApi'
import { TeamInfoResponse } from '@/features/team/types/team.types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface MiniTeamCardProps {
  teamInfo: TeamInfoResponse | null
}

export default function MiniTeamCard({ teamInfo }: MiniTeamCardProps) {
  const [isTeamScrap, setIsTeamScrap] = useState(teamInfo?.result.teamInformMenu.isTeamScrap)
  const [isScrapLoading, setIsScrapLoading] = useState(false)

  const handleScrapClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      setIsScrapLoading(true)
      const response = await teamScrap(teamInfo?.result?.teamInformMenu.teamCode || '', !isTeamScrap)
      if (response.ok) {
        alert('스크랩 완료')
        setIsTeamScrap(!isTeamScrap)
      }
    } catch (error) {
      console.error('Failed to team scrap:', error)
    } finally {
      setIsScrapLoading(false)
    }
  }

  return (
    <Link
      href={`/team/${teamInfo?.result.teamInformMenu.teamCode}/log`}
      className="flex w-[19.525rem] flex-col rounded-xl bg-white px-7 py-[1.12rem]"
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          {teamInfo?.result.teamInformMenu.teamCurrentStates.map((state, index) => (
            <div key={index} className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">
              {state.teamStateName}
            </div>
          ))}
        </div>
        <button onClick={handleScrapClick} className="group relative h-5 w-5">
          <Image
            src={isTeamScrap ? `/common/icons/save.svg` : `/common/icons/not_save.svg`}
            alt="scrap"
            width={20}
            height={20}
            className="absolute left-0 top-0 cursor-pointer group-hover:opacity-0"
          />
          <Image
            src="/common/icons/save.svg"
            alt="scrap hover"
            width={20}
            height={20}
            className="absolute left-0 top-0 cursor-pointer opacity-0 group-hover:opacity-100"
          />
        </button>
      </div>

      <div className="mt-5 flex gap-4">
        <Image
          src={teamInfo?.result.teamInformMenu.teamLogoImagePath || `/common/default_profile.svg`}
          alt="folder"
          width={70}
          height={70}
          className="rounded-lg"
        />
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-grey90">{teamInfo?.result.teamInformMenu.teamName}</span>
            <span className="text-xs text-grey70">스크랩수 {teamInfo?.result.teamInformMenu.teamScrapCount}</span>
          </div>

          <div className="mt-1 flex flex-col ">
            <div className="flex items-center gap-2">
              <span className="text-xs text-grey50">규모</span>
              <span className="text-xs text-grey50">|</span>
              <span className="text-xs text-grey70">{teamInfo?.result.teamInformMenu.teamScaleItem.teamScaleName}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-grey50">지역</span>
              <span className="text-xs text-grey50">|</span>
              <span className="text-xs text-grey70">
                {teamInfo?.result.teamInformMenu.regionDetail.cityName}{' '}
                {teamInfo?.result.teamInformMenu.regionDetail.divisionName}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-grey90">{teamInfo?.result.teamInformMenu.teamShortDescription}</div>
    </Link>
  )
}
