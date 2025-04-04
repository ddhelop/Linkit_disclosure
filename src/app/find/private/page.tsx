import { loadFindPrivateData } from '@/features/find-private/FindPrivateLoader'
import FindPrivateFilter from '@/features/find-private/ui/FindPrivateFilter'
import FindPrivateResult from '@/features/find-private/ui/FindPrivateResult'
import { HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { createMetadata } from '@/shared/utils/metadata'
import { BASE_SITE_URL } from '@/shared/constants/seo'

// 페이지별 메타데이터 생성
export const metadata: Metadata = createMetadata({
  title: '개인 프로필 찾기',
  description:
    '링킷에서 프로젝트에 적합한 팀원을 찾아보세요. 다양한 재능을 가진 개인들이 프로젝트 참여를 기다리고 있습니다.',
  url: `${BASE_SITE_URL}/find/private`,
  keywords: ['개인 프로필', '팀원 찾기', '프로젝트 팀원', '개발자 찾기', '디자이너 찾기', '기획자 찾기'],
})

export default async function FindPrivatePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] }
}) {
  const dehydratedState = await loadFindPrivateData(searchParams)

  return (
    <HydrationBoundary state={dehydratedState}>
      <article className="relative w-full pb-20">
        {/* 고정된 배경 이미지 */}
        <div
          className="absolute right-0 top-0 h-[14.1rem] w-full"
          style={{
            backgroundImage: `url('/common/images/find_private_background.png')`,
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
              <h1 className="text-xs text-black sm:text-base">팀원 찾기</h1>
              <p className="whitespace-pre-line text-sm font-semibold text-black sm:text-xl">
                사이드 프로젝트부터 창업까지, 함께할 팀원을 찾아보세요
              </p>
            </header>

            {/* 필터 */}
            <section className="mt-[2.19rem]" aria-label="팀원 검색 필터">
              <FindPrivateFilter />
            </section>

            {/* 필터링 결과 */}
            <section className="mt-12" aria-label="팀원 검색 결과">
              <FindPrivateResult />
            </section>
          </main>
        </div>
      </article>
    </HydrationBoundary>
  )
}
