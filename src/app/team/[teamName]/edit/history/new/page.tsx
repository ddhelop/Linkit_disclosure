import TeamEditHistoryNew from '@/features/team/edit/history/TeamEditHistoryNew'
import Image from 'next/image'
import Link from 'next/link'

export default async function TeamEditHistoryNewPage({ params }: { params: { teamName: string } }) {
  const teamName = params.teamName

  return (
    <div className="flex flex-col gap-5">
      <Link href={`/team/${params.teamName}/edit/history`} className="flex gap-2">
        <Image src="/common/icons/arrow-left.svg" width={24} height={24} alt="back" />
        <label className="text-xl font-bold">연혁</label>
      </Link>

      <TeamEditHistoryNew teamName={params.teamName} />
    </div>
  )
}
