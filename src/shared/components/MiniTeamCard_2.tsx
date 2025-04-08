'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { teamScrap } from '../api/commonApi'
import { useToast } from '../hooks/useToast'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/useAuthStore'
import { TeamCard } from '@/features/team/types/team.types'

interface MiniTeamCard_2Props {
  team: TeamCard
}

export default function MiniTeamCard_2({ team }: MiniTeamCard_2Props) {
  const [isHovered, setIsHovered] = useState(false)

  const [scrapCount, setScrapCount] = useState(team?.teamScrapCount ?? 0)
  const [isScrapLoading, setIsScrapLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()
  const { isLogin } = useAuthStore()

  const handleScrap = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isScrapLoading) return

    try {
      if (!isLogin) {
        toast.alert('로그인이 필요한 기능입니다.')
        router.push('/login')
        return
      }
      setIsScrapLoading(true)
      const response = await teamScrap(team.teamCode, !team.isTeamScrap)
      if (response.ok) {
        team.isTeamScrap = !team.isTeamScrap
        setScrapCount((prev) => (team.isTeamScrap ? prev - 1 : prev + 1))
        toast.success(!team.isTeamScrap ? '스크랩이 완료되었어요.' : '스크랩이 취소되었어요.')
      }
    } catch (error) {
      toast.alert('스크랩 상태 변경에 실패했습니다.')
    } finally {
      setIsScrapLoading(false)
    }
  }

  return (
    <Link
      href={`/team/${team?.teamCode}/log`}
      className="flex min-w-[16rem] cursor-pointer flex-col rounded-xl border border-grey30 bg-white p-[1.12rem] hover:border-[#4D82F3] md:min-w-[unset]"
      style={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        margin: '1px', // 그림자가 잘리지 않도록 최소 마진 추가
      }}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">
            {team?.teamCurrentStates?.[0]?.teamStateName}
          </div>

          {team?.teamCurrentStates?.length > 1 && (
            <div className="rounded-[0.38rem] bg-[#EDF3FF] px-2 py-1 text-xs text-[#3774F4]">
              +{team?.teamCurrentStates?.length - 1}
            </div>
          )}
        </div>

        {/* 스크랩 버튼 */}
        <div
          onClick={handleScrap}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer p-1" // 클릭 영역 확장
        >
          <Image
            src={team.isTeamScrap || isHovered ? '/common/icons/save.svg' : '/common/icons/not_save.svg'}
            width={18}
            height={18}
            alt="save"
          />
        </div>
      </div>

      {/* 팀 정보 */}
      <div className="mt-5 flex gap-4">
        <div className="relative h-[70px] w-[70px]">
          <Image
            src={team?.teamLogoImagePath || '/common/default_profile.svg'}
            alt="profile"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-grey90">{team?.teamName}</span>
            <span className="text-xs text-grey70">스크랩 수 {scrapCount}</span>
          </div>
          <span className="flex gap-1 text-xs text-grey50">
            <span>팀원 </span>
            <span>|</span>
            <span className="text-grey70">{team?.teamScaleItem?.teamScaleName}</span>
          </span>
          <span className="flex gap-1 text-xs text-grey50">
            <span>지역 </span>
            <span>|</span>
            <span className="text-grey70">{`${team?.regionDetail?.cityName} ${team?.regionDetail?.divisionName}`}</span>
          </span>
        </div>
      </div>
      <span className="mt-3 px-2 text-xs text-grey90">{team?.teamShortDescription}</span>
    </Link>
  )
}
