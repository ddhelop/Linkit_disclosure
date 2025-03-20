import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import { loadTeamHistory } from '@/features/team-view/loader'
import TeamEditHistoy from '@/features/team/edit/history/TeamEditHistoy'
import { Button } from '@/shared/ui/Button/Button'
import { HydrationBoundary } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

export default async function TeamEditHistoryPage({ params }: { params: { teamName: string } }) {
  const { teamName } = params

  const dehydratedState = await loadTeamHistory(teamName)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col pb-16 md:pb-0">
        <h1 className="mb-5 text-xl font-bold">연혁</h1>

        <Link href={`/team/${params.teamName}/edit/history/new`}>
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

        <TeamEditHistoy teamName={params.teamName} />
      </div>
      <ProfileEditBottomNav prevPath={`/team/${params.teamName}/edit/products`} isLastPage={true} />
    </HydrationBoundary>
  )
}
