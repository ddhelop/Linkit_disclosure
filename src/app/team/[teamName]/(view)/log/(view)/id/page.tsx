import TeamViewLogList from '@/features/team/view/log/TeamViewLogList'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamViewLogDetailPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Link href={`/team/${params.teamName}/log`}>
          <Image src={'/common/icons/arrow-left.svg'} alt="arrow-left" width={24} height={24} />
        </Link>
        <h1 className="text-xl font-semibold">{params.teamName}의 로그</h1>
      </div>

      <TeamViewLogList params={params} />
    </div>
  )
}
