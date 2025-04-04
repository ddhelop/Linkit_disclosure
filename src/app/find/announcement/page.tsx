import { loadFindAnnouncementData } from '@/features/find-announcement/FindAnnouncementLoader'
import FindAnnouncementFilter from '@/features/find-announcement/ui/FindAnnouncementFilter'
import AnnouncementFilterResult from '@/features/find-announcement/ui/FindAnnouncementFilterResult'
import { HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { createMetadata } from '@/shared/utils/metadata'
import { BASE_SITE_URL } from '@/shared/constants/seo'

// 페이지별 메타데이터 생성
export const metadata: Metadata = createMetadata({
  title: '모집 공고 찾기',
  description: '링킷에서 다양한 프로젝트와 팀의 모집 공고를 확인하세요. 나에게 맞는 팀에 지원해보세요.',
  url: `${BASE_SITE_URL}/find/announcement`,
  keywords: ['모집 공고', '프로젝트 공고', '팀원 모집', '스타트업 채용', '프로젝트 참여'],
})

export default async function FindAnnouncementPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] }
}) {
  const dehydratedState = await loadFindAnnouncementData(searchParams)
  return (
    <HydrationBoundary state={dehydratedState}>
      <article className="relative w-full pb-20">
        {/* 고정된 배경 이미지 */}
        <div
          className="absolute right-0 top-0 h-[14.1rem] w-full"
          style={{
            backgroundImage: `url('/common/images/find_announcement_background.png')`,
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
              <h1 className="text-xs text-grey30 sm:text-base">모집 공고</h1>
              <p className="whitespace-pre-wrap text-sm font-semibold text-white sm:text-2xl">
                나에게 맞는 팀에 합류해보세요.
              </p>
            </header>

            {/* 필터 */}
            <section className="mt-[2.19rem]" aria-label="공고 검색 필터">
              <FindAnnouncementFilter />
            </section>

            {/* 필터링 결과 */}
            <section className="mt-12" aria-label="공고 검색 결과">
              <AnnouncementFilterResult />
            </section>
          </main>
        </div>
      </article>
    </HydrationBoundary>
  )
}
