import TeamViewDetail from '@/features/team/view/log/TeamViewDetail'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default function TeamViewLogDetailPage({ params }: { params: { id: number; teamName: string } }) {
  const { teamName, id } = params
  return (
    <>
      <TeamViewDetail teamName={teamName} id={id} />

      <Link href={`/team/${teamName}/log`}>
        <Button className="mt-5 border border-grey40 bg-[#fcfcfd] text-grey70" animationMode="grey" mode="custom">
          목록으로
        </Button>
      </Link>
    </>
  )
}
