'use client'

import { Team } from '@/features/find/types/FindTypes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { teamScrap } from '../api/commonApi'

interface MiniTeamCard_2Props {
  team: Team
}

export default function MiniTeamCard_2({ team }: MiniTeamCard_2Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isScraped, setIsScraped] = useState(team.isTeamScrap)
  const [scrapCount, setScrapCount] = useState(team.teamScrapCount)

  const handleScrap = async (e: React.MouseEvent) => {
    e.preventDefault() // Link 컴포넌트의 기본 동작 방지
    try {
      const response = await teamScrap(team.teamName, !isScraped)
      if (response.ok) {
        setIsScraped(!isScraped)
        setScrapCount((prev) => (isScraped ? prev - 1 : prev + 1))
        alert('스크랩 완료되었습니다.')
      }
    } catch (error) {
      console.error('Failed to update scrap:', error)
    }
  }

  return (
    <Link
      href={`/team/${team.teamCode}/log`}
      className="flex cursor-pointer flex-col rounded-xl border border-transparent px-7 py-[1.12rem] hover:border-[#7EA5F8]"
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          {team.teamCurrentStates.map((state, index) => {
            if (index < 2) {
              return (
                <div key={index} className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">
                  {state.teamStateName}
                </div>
              )
            }
            if (index === 2) {
              return (
                <div key={index} className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">
                  +{team.teamCurrentStates.length - 2}
                </div>
              )
            }
            return null
          })}
        </div>
        {/* 스크랩 버튼 */}
        <div
          onClick={handleScrap}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer p-1" // 클릭 영역 확장
        >
          <Image
            src={isScraped || isHovered ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
            width={18}
            height={18}
            alt="save"
          />
        </div>
      </div>

      {/* 팀 정보 */}
      <div className="mt-5 flex gap-4">
        <Image src={team.teamLogoImagePath || '/common/default_profile.svg'} width={70} height={70} alt="profile" />
        <div className="flex flex-col justify-center gap-1">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-grey90">{team.teamName}</span>
            <span className="text-xs text-grey70">스크랩 수 {scrapCount}</span>
          </div>
          <span className="flex gap-1 text-xs text-grey50">
            <span>팀원 </span>
            <span>|</span>
            <span className="text-grey70">{team.teamScaleItem.teamScaleName}</span>
          </span>
          <span className="flex gap-1 text-xs text-grey50">
            <span>지역 </span>
            <span>|</span>
            <span className="text-grey70">{`${team.regionDetail.cityName} ${team.regionDetail.divisionName}`}</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
