'use client'
import Banner from '@/components/Banner/Banner'
import { getPopularLog } from '@/components/Home/api/HomeApi'
import Footer from '@/components/Home/Footer'

import HomeAnnouncementSection from '@/components/Home/HomeAnnouncementSection'
import HomeLogSection from '@/components/Home/HomeLogSection'
import HomeTeamMemberSection from '@/components/Home/HomeTeamMemberSection'
import HomeTeamSection from '@/components/Home/HomeTeamSection'
import { ILogCard } from '@/shared/types/Card/LogCardTypes'
import { useEffect, useState } from 'react'

export default function Intropage() {
  const [popularLog, setPopularLog] = useState<ILogCard[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // 인기 로그 조회
      const response = await getPopularLog()
      setPopularLog(response.result.logInformMenus)
    }
    fetchData()
  }, [])

  return (
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
        <HomeLogSection popularLog={popularLog} />
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  )
}
