'use client'

import { teamScrap } from '@/features/team/api/teamApi'
import { TeamInfoResponse } from '@/features/team/types/team.types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useToast } from '../hooks/useToast'

interface MiniTeamCardProps {
  teamInfo: TeamInfoResponse
}

export default function MiniTeamCard({ teamInfo }: MiniTeamCardProps) {
  const [isTeamScrap, setIsTeamScrap] = useState(teamInfo?.result?.teamInformMenu.isTeamScrap ?? false)
  const [isScrapLoading, setIsScrapLoading] = useState(false)
  const [scrapCount, setScrapCount] = useState(teamInfo?.result?.teamInformMenu.teamScrapCount ?? 0)
  const toast = useToast()

  const handleScrapClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isScrapLoading) return

    try {
      setIsScrapLoading(true)

      await teamScrap(teamInfo?.result?.teamInformMenu.teamCode || '', !isTeamScrap)
      setIsTeamScrap(!isTeamScrap)
      setScrapCount((prev) => (isTeamScrap ? prev - 1 : prev + 1))
      toast.success('스크랩 상태가 변경되었습니다.')
    } catch (error) {
      toast.alert('스크랩 상태 변경에 실패했습니다.')
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
          {teamInfo?.result.teamInformMenu.teamCurrentStates.slice(0, 2).map((state, index) => (
            <div key={index} className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">
              {state.teamStateName}
            </div>
          ))}
          {teamInfo?.result.teamInformMenu.teamCurrentStates.length > 2 && (
            <div className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">
              +{teamInfo.result.teamInformMenu.teamCurrentStates.length - 2}
            </div>
          )}
        </div>
        <button onClick={handleScrapClick} className="relative h-5 w-5">
          <Image
            src={isTeamScrap ? `/common/icons/save.svg` : `/common/icons/not_save.svg`}
            alt="scrap"
            width={20}
            height={20}
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
            <span className="text-xs text-grey70">스크랩 수 {scrapCount}</span>
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
