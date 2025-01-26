import TeamEditRecruitment from '@/features/team/edit/recruitment/TeamEditRecruitment'

import Image from 'next/image'
import Link from 'next/link'

export default function TeamEditRecruitNewPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="flex flex-col">
      <Link href={`/team/${params.teamName}/edit/recruit`} className="flex gap-2">
        <Image src="/common/icons/arrow-left.svg" width={24} height={24} alt="back" />
        <label className="text-xl font-bold">모집 공고</label>
      </Link>
      <TeamEditRecruitment params={params} />
    </div>
  )
}
