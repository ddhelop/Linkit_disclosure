import Banner from '@/app/(home)/ui/Banner'
import HomeAnnouncementSection from '@/app/(home)/ui/HomeAnnouncementSection'
import HomeTeamSection from './ui/HomeTeamSection'
import HomeTeamMemberSection from './ui/HomeTeamMemberSection'
import Footer from './ui/Footer'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getAnnouncements, getPopularLog, getRecommendedTeamMembers, getRecommendedTeams } from './api/homeApi'
import HomeLogSection from './ui/HomeLogSection'

async function getData() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({ queryKey: ['popularLog'], queryFn: getPopularLog })
  await queryClient.prefetchQuery({ queryKey: ['announcements'], queryFn: getAnnouncements })
  await queryClient.prefetchQuery({ queryKey: ['recommendedTeams'], queryFn: getRecommendedTeams })
  await queryClient.prefetchQuery({ queryKey: ['recommendedTeamMembers'], queryFn: getRecommendedTeamMembers })
  return dehydrate(queryClient)
}

export default async function HomePage() {
  const dehydratedState = await getData()

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex w-full flex-col items-center bg-white">
        <Banner />

        {/*  */}
        <div className="flex w-[93%] flex-col items-center gap-16 md:mt-[3.77rem] xl:w-[65%] ">
          {/* 모집 공고 섹션 */}
          <HomeAnnouncementSection />

          {/* 팀 추천 섹션 */}
          <HomeTeamSection />

          {/* 팀원 추천 섹션 */}
          <HomeTeamMemberSection />

          {/* 인기 로그 */}
          <HomeLogSection />
        </div>

        {/* 푸터 */}
        <Footer />
      </div>
    </HydrationBoundary>
  )
}
