import Image from 'next/image'
import React from 'react'
import { ProfileInform } from '@/features/match/types/MatchTypes'

interface MiniProfileCard2Props {
  profile: ProfileInform
}

export default function MiniProfileCard_2({ profile }: MiniProfileCard2Props) {
  return (
    <div className="flex w-[17.5rem] cursor-pointer flex-col rounded-xl bg-[#EDF3FF] p-[1.37rem] hover:border hover:border-main">
      {/* 첫째줄 */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          {profile.profileCurrentStates.slice(0, 2).map((state, index) => (
            <div key={index} className="rounded-[0.38rem] bg-white px-2 py-1 text-xs text-grey90">
              {state.profileStateName}
            </div>
          ))}
          {profile.profileCurrentStates.length > 2 && (
            <div className="rounded-[0.38rem] bg-white px-2 py-1 text-xs text-grey90">
              +{profile.profileCurrentStates.length - 2}
            </div>
          )}
        </div>
        <Image src="/common/icons/save.svg" width={16} height={16} alt="save" />
      </div>

      <div className="mt-[1.59rem] flex gap-3">
        <Image src={profile.profileImagePath || '/common/default_profile.svg'} width={80} height={80} alt="profile" />
        <div className="flex flex-col justify-center">
          <span className="text-lg font-bold text-grey90">{profile.memberName}</span>
          <span className="flex gap-1">
            <span className="text-xs text-grey50">포지션</span>
            <span className="text-xs text-grey50">|</span>
            <span className="text-xs text-grey70">{profile.majorPosition}</span>
          </span>
          <span className="flex gap-1">
            <span className="text-xs text-grey50">지역</span>
            <span className="pl-[0.655rem] text-xs text-grey50">|</span>
            <span className="text-xs text-grey70">
              {profile.regionDetail.cityName} {profile.regionDetail.divisionName}
            </span>
          </span>
        </div>
      </div>
      <hr className="my-3 border-grey40" />

      {/* 팀 목록 */}
      <div className="flex gap-4">
        {profile.profileTeamInforms.map((team, index) => (
          <Image
            key={index}
            src={team.teamLogoImagePath || '/common/default_profile.svg'}
            width={40}
            height={40}
            alt={team.teamName}
          />
        ))}
      </div>
    </div>
  )
}
