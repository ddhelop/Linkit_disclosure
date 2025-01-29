'use client'
import { useEffect, useState } from 'react'
import { getTeamMemberRecommend } from './api/HomeApi'
import { ProfileInform } from '@/features/match/types/MatchTypes'
import MiniProfileCard_2 from '@/shared/components/MiniProfileCard_2'
import Link from 'next/link'
import Image from 'next/image'

export default function HomeTeamMemberSection() {
  const [teamMemberRecommend, setTeamMemberRecommend] = useState<ProfileInform[]>([])

  useEffect(() => {
    const fetchTeamRecommend = async () => {
      const response = await getTeamMemberRecommend()
      setTeamMemberRecommend(response.result.profileInformMenus)
    }
    fetchTeamRecommend()
  }, [])
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">이런 팀원은 어때요?</h1>
        <Link href="/find/private" className="flex cursor-pointer items-center gap-1">
          <span className="text-sm text-grey60 ">전체보기</span>
          <Image src="/common/icons/arrow-right(greyblack).svg" alt="arrow_right" width={16} height={16} />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {teamMemberRecommend.map((profile) => (
          <MiniProfileCard_2 key={profile.emailId} profile={profile} />
        ))}
      </div>
    </div>
  )
}
