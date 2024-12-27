import TeamViewRecruitDetail from '@/features/team/view/recruitment/TeamViewRecruitDetail'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamViewRecruitDetailPage({ params }: { params: { teamName: string; id: string } }) {
  return (
    <div className="">
      <div className="flex gap-2 p-4">
        <Link href={`/team/${params.teamName}/recruit`} className="flex gap-2 rounded-lg p-1 hover:bg-grey20">
          <Image src="/common/icons/arrow-left.svg" alt="close" width={24} height={24} />
          <span className="text-xl font-semibold">{params.teamName}의 모집공고</span>
        </Link>
      </div>
      <div className="mt-6">
        <TeamViewRecruitDetail teamName={params.teamName} id={params.id} />
      </div>
    </div>
  )
}
