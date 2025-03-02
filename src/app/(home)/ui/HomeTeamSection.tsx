'use client'
import MiniTeamCard_2 from '@/shared/components/MiniTeamCard_2'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { getRecommendedTeams } from '../api/homeApi'

export default function HomeTeamSection() {
  const { data } = useQuery({
    queryKey: ['teamRecommend'],
    queryFn: getRecommendedTeams,
    // suspense: true,
  })

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">팀원으로 합류해 보세요</h1>
        <Link href="/find/team" className="flex cursor-pointer items-center gap-1">
          <span className="text-sm text-grey60 ">전체보기</span>
          <Image src="/common/icons/arrow-right(greyblack).svg" alt="arrow_right" width={16} height={16} />
        </Link>
      </div>
      <div className="flex gap-6 overflow-x-auto p-1 md:grid md:grid-cols-2 [&::-webkit-scrollbar]:hidden">
        {data?.result.teamInformMenus.map((team) => <MiniTeamCard_2 key={team.teamCode} team={team} />)}
      </div>
    </div>
  )
}
