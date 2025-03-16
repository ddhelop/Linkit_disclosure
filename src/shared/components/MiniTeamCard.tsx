'use client'

import Image from 'next/image'
import Link from 'next/link'
import { TeamCard } from '@/features/team/types/team.types'

export default function MiniTeamCard({ teamInfo }: { teamInfo: TeamCard }) {
  return (
    <Link
      href={`/team/${teamInfo?.teamCode}/log`}
      className="flex w-[19.525rem] flex-col rounded-xl border border-transparent bg-white px-7 py-[1.12rem] hover:border-main"
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          {teamInfo?.teamCurrentStates?.slice(0, 2).map((state, index) => (
            <div key={index} className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">
              {state.teamStateName}
            </div>
          ))}
          {teamInfo?.teamCurrentStates?.length > 2 && (
            <div className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">
              +{teamInfo?.teamCurrentStates?.length - 2}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex gap-4">
        <Image
          src={teamInfo?.teamLogoImagePath || `/common/default_profile.svg`}
          alt="folder"
          width={70}
          height={70}
          className="rounded-lg"
        />
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-grey90">{teamInfo?.teamName}</span>
          </div>

          <div className="mt-1 flex flex-col ">
            <div className="flex items-center gap-2">
              <span className="text-xs text-grey50">규모</span>
              <span className="text-xs text-grey50">|</span>
              <span className="text-xs text-grey70">{teamInfo?.teamScaleItem?.teamScaleName}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-grey50">지역</span>
              <span className="text-xs text-grey50">|</span>
              <span className="text-xs text-grey70">
                {teamInfo?.regionDetail?.cityName} {teamInfo?.regionDetail?.divisionName}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-grey90">{teamInfo?.teamShortDescription}</div>
    </Link>
  )
}
