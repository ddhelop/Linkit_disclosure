import Banner from '@/app/(home)/ui/Banner'
import HomeAnnouncementSection from '@/app/(home)/ui/HomeAnnouncementSection'
import HomeTeamSection from './ui/HomeTeamSection'
import HomeTeamMemberSection from './ui/HomeTeamMemberSection'
import Footer from './ui/Footer'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getAnnouncements, getPopularLog, getRecommendedTeamMembers, getRecommendedTeams } from './api/homeApi'
import HomeLogSection from './ui/HomeLogSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '링킷ㅣ일하는 사람들의 연결점',
  description: '예비·초기 스타트업부터 사이드 프로젝트 팀, 대학생부터 예비 창업가를 위한 팀빌딩 서비스',
  keywords:
    '팀빌딩, 팀 매칭, 팀 구성, 팀원 모집, 창업, 스타트업, 사이드프로젝트, 스타트업 팀빌딩, 창업 팀원 모집, 해커톤 팀원 모집, 대학생 팀원 모집',
}

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
