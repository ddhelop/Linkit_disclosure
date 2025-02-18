import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import TeamEditLog from '@/features/team/edit/log/TeamEditLog'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function TeamEditLogPage({ params }: { params: { teamName: string } }) {
  const teamName = params.teamName

  return (
    <>
      <div className="flex w-full flex-col pb-16 md:pb-0">
        <h1 className="mb-5 text-xl font-bold">팀 로그</h1>

        <Link href={`/team/${teamName}/edit/log/new`}>
          <Button
            animationMode="main"
            mode="main2"
            size="custom"
            className="flex w-full items-center justify-center gap-2 rounded-[0.63rem] py-2 text-sm"
          >
            <Image src="/common/icons/plus.svg" width={15} height={15} alt="plus-icon" />
            추가하기
          </Button>
        </Link>
        <Suspense fallback={<div className="w-full">Loading...</div>}>
          <TeamEditLog teamName={teamName} />
        </Suspense>
      </div>

      <ProfileEditBottomNav isFirstPage={true} nextPath={`/team/${teamName}/edit/basic`} />
    </>
  )
}
