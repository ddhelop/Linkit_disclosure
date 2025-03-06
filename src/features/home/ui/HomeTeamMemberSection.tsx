'use client'
import MiniProfileCard_2 from '@/shared/components/MiniProfileCard_2'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { getRecommendedTeamMembers } from '../api/homeApi'

export default function HomeTeamMemberSection() {
  const { data } = useQuery({
    queryKey: ['teamMemberRecommend'],
    queryFn: getRecommendedTeamMembers,
    // suspense: true,
  })

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">이런 팀원은 어때요?</h1>
        <Link href="/find/private" className="flex cursor-pointer items-center gap-1">
          <span className="text-sm text-grey60 ">전체보기</span>
          <Image src="/common/icons/arrow-right(greyblack).svg" alt="arrow_right" width={16} height={16} />
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-2  lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {data?.result.profileInformMenus.map((profile) => (
          <MiniProfileCard_2 key={profile.emailId} profile={profile} />
        ))}
      </div>
    </div>
  )
}
