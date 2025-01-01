import TeamEditHistoy from '@/features/team/edit/history/TeamEditHistoy'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

export default function TeamEditHistoryPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">연혁</h1>

      <Link href={`/team/${params.teamName}/edit/history/new`}>
        <Button mode="main2" animationMode="main" className="mt-5 w-full rounded-[0.69rem] py-2">
          + 추가하기
        </Button>
      </Link>

      <TeamEditHistoy teamName={params.teamName} />
    </div>
  )
}
