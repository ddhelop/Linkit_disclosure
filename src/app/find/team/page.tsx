import { loadFindTeamData } from '@/features/find-team/FindTeamLoader'
import FindTeamFilter from '@/features/find-team/ui/FindTeamFilter'
import FindTeamFilterResult from '@/features/find-team/ui/FindTeamFilterResult'
import { HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '팀 찾기',
}

export default async function FindTeamPage({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  const dehydratedState = await loadFindTeamData(searchParams)
  return (
    <HydrationBoundary state={dehydratedState}>
      <article className="relative w-full pb-20">
        {/* 고정된 배경 이미지 */}
        <div
          className="absolute right-0 top-0 h-[14.1rem] w-full"
          style={{
            backgroundImage: `url('/common/images/find_team_background.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
          aria-hidden="true"
        ></div>

        {/* 컨텐츠 컨테이너 */}
        <div className="relative flex w-full justify-center">
          <main className="flex w-[95%] flex-col pt-9 lg:w-[78%]">
            <header className="flex flex-col gap-2 px-3 lg:px-16">
              <h1 className="text-xs text-grey30 sm:text-base">팀 찾기</h1>
              <p className="whitespace-pre-line text-sm font-semibold text-white sm:text-xl">
                사이드 프로젝트부터 창업까지, 함께할 팀을 찾아보세요
              </p>
            </header>

            {/* 필터 */}
            <section className="mt-[2.19rem]" aria-label="팀 검색 필터">
              <FindTeamFilter />
            </section>

            {/* 필터링 결과 */}
            <section className="mt-12" aria-label="팀 검색 결과">
              <FindTeamFilterResult />
            </section>
          </main>
        </div>
      </article>
    </HydrationBoundary>
  )
}
