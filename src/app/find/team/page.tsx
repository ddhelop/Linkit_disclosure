import { loadFindTeamData } from '@/features/find-team/FindTeamLoader'
import FindTeamFilter from '@/features/find-team/ui/FindTeamFilter'

import TeamFilterResult from '@/features/find-team/ui/FindTeamFilterResult'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function FindTeamPage({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  const dehydratedState = await loadFindTeamData(searchParams)
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={`relative w-full pb-20`}>
        {/* 고정된 배경 이미지 */}
        <div
          className="absolute right-0 top-0 h-[14.1rem] w-full"
          style={{
            backgroundImage: `url('/common/images/find_team_background.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        ></div>
        {/* 컨텐츠 컨테이너 */}
        <div className="relative flex w-full justify-center">
          <div className="flex w-[95%] flex-col pt-9 lg:w-[78%]">
            <div className="flex flex-col gap-2 px-3 lg:px-16">
              <h1 className="text-xs text-grey30 sm:text-base">팀 찾기</h1>
              <span className="whitespace-pre-line text-sm font-semibold text-white sm:text-xl">
                사이드 프로젝트부터 창업까지, 합류하고 싶은 팀을 찾아보세요
              </span>
            </div>
            {/* 필터 */}
            <div className="mt-[2.19rem]">
              <FindTeamFilter />
            </div>

            {/* 필터링 결과 */}
            <div className="mt-12">
              <TeamFilterResult />
            </div>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}
