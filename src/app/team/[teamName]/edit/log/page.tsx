import TeamEditLog from '@/features/team/edit/log/TeamEditLog'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function TeamEditLogPage({ params }: { params: { teamName: string } }) {
  const teamName = params.teamName

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">팀 로그</h1>

      <Link href={`/team/${teamName}/edit/log/new`}>
        <Button mode="main2" animationMode="main" className="mt-5 w-full rounded-[0.69rem] py-2">
          + 추가하기
        </Button>
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <TeamEditLog teamName={teamName} />
      </Suspense>
    </div>
  )
}
