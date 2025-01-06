import Image from 'next/image'
import React, { useState } from 'react'
import { ProfileInform } from '@/features/match/types/MatchTypes'
import Link from 'next/link'
import { profileScrap } from '../api/commonApi'

interface MiniProfileCard2Props {
  profile: ProfileInform
}

export default function MiniProfileCard_2({ profile }: MiniProfileCard2Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isScraped, setIsScraped] = useState(profile.isProfileScrap)
  const [scrapCount, setScrapCount] = useState(profile.profileScrapCount)

  const handleScrap = async (e: React.MouseEvent) => {
    e.preventDefault() // Link 컴포넌트의 기본 동작 방지
    try {
      const response = await profileScrap(profile.emailId, !isScraped)
      if (response.ok) {
        setIsScraped(!isScraped)
        setScrapCount((prev) => (isScraped ? prev - 1 : prev + 1))
      }
    } catch (error) {
      console.error('Failed to update scrap:', error)
    }
  }

  return (
    <Link
      href={`/${profile.emailId}`}
      className="flex w-full cursor-pointer flex-col rounded-xl bg-[#EDF3FF] p-[1.37rem] hover:border hover:border-main"
    >
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
        {/* 스크랩 버튼 */}
        <div
          onClick={handleScrap}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer p-1"
        >
          <Image
            src={isScraped || isHovered ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
            width={18}
            height={18}
            alt="save"
          />
        </div>
      </div>

      <div className="mt-[1.59rem] flex gap-3">
        <Image
          src={profile.profileImagePath || '/common/default_profile.svg'}
          width={80}
          height={80}
          alt="profile"
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-grey90">{profile.memberName}</span>
            <span className="text-xs text-grey70">스크랩 수 {scrapCount}</span>
          </div>
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
            className="h-10 w-10 rounded-lg object-cover"
          />
        ))}
      </div>
    </Link>
  )
}
