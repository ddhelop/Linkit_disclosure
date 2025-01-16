'use client'

import Banner from '../Banner/Banner'
import Footer from './Footer'
import HomeAnnouncementSection from './HomeAnnouncementSection'
import HomeTeamMemberSection from './HomeTeamMemberSection'
import HomeTeamSection from './HomeTeamSection'

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center bg-white">
      <Banner />

      {/*  */}
      <div className="mt-[3.77rem] flex w-[65%] flex-col items-center gap-16">
        {/* 모집 공고 섹션 */}
        <HomeAnnouncementSection />

        {/* 팀 추천 섹션 */}
        <HomeTeamSection />

        {/* 팀원 추천 섹션 */}
        <HomeTeamMemberSection />
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  )
}
