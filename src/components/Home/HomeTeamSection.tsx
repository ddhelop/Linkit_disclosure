'use client'

import MiniTeamCard_2 from '@/shared/components/MiniTeamCard_2'
import { useEffect, useState } from 'react'
import { getTeamRecommend } from './api/HomeApi'
import { Team } from '@/features/find/types/FindTypes'
import Link from 'next/link'
import Image from 'next/image'

export default function HomeTeamSection() {
  const [teamRecommend, setTeamRecommend] = useState<Team[]>([])

  useEffect(() => {
    const fetchTeamRecommend = async () => {
      const response = await getTeamRecommend()
      setTeamRecommend(response.result.teamInformMenus)
    }
    fetchTeamRecommend()
  }, [])

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">팀원으로 합류해 보세요</h1>
        <Link href="/find/team" className="flex cursor-pointer items-center gap-1">
          <span className="text-sm text-grey60 ">전체보기</span>
          <Image src="/common/icons/arrow-right(greyblack).svg" alt="arrow_right" width={16} height={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {teamRecommend.map((team) => (
          <MiniTeamCard_2 key={team.teamCode} team={team} />
        ))}
      </div>
    </div>
  )
}
