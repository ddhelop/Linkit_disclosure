'use client'

import { useEffect, useState } from 'react'
import { fetchProfileDetailData } from '@/features/profile/api/profileViewApi'
import ProfileScrap from './ProfileScrap'
import { ProfileViewProvider } from '@/entities/profile/model/ProfileViewContext'
import { ProfileDetailData } from '@/entities/profile/model/types'
import MiniProfileCard from '@/shared/components/MiniProfileCard'
import ProfileViewProgress from '@/features/profile/edit/components/common/ProfileViewProgress'
import ProfileMatchButton from './ProfileMatchButton'
import Tooltip from '@/shared/components/Tooltip'

export default function ProfileViewClient({
  children,
  params,
}: {
  children: React.ReactNode
  params: { emailId: string }
}) {
  const [profileData, setProfileData] = useState<ProfileDetailData | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProfileDetailData(params.emailId)
        console.log(data.result)
        setProfileData(data.result) // 데이터 구조에 맞춰 설정
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }
    getData()
  }, [params.emailId])

  if (!profileData) return <div>Loading...</div>

  return (
    <div className="flex bg-white">
      <ProfileViewProvider profileData={profileData}>
        {/* 왼쪽 사이드바 영역 */}
        <aside className=" fixed top-16 hidden h-[calc(100vh-4rem)] w-[28%] flex-col items-end pr-[4.5rem] pt-[3.75rem] lg:flex">
          <div
            className="rounded-xl border border-grey30 p-4"
            style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
          >
            <ProfileViewProgress />
            <MiniProfileCard />

            {/* 내 프로필이 아닐 경우 스크랩 버튼 보이기 */}
            {!profileData.isMyProfile ? (
              <ProfileScrap />
            ) : (
              <div className="mt-7 flex w-full items-center justify-between rounded-full bg-grey20 px-5 py-[0.88rem]">
                <div className="flex items-center  gap-5 text-grey70">
                  <span className="text-sm">스크랩 수</span>
                  <span className="">{profileData.profileScrapCount}</span>
                </div>
                <Tooltip
                  text="다른 사용자가 나의 프로필을
                  스크랩한 횟수를 보여줍니다"
                  className="left-20 top-[22px] w-[165px]"
                ></Tooltip>
              </div>
            )}
            {/* 내 프로필이 아닐 경우 매칭 버튼 보이기 */}
            {!profileData.isMyProfile && <ProfileMatchButton />}
          </div>
        </aside>
      </ProfileViewProvider>

      {/* 오른쪽 메인 컨텐츠 영역 */}
      <main className="min-h-[calc(100vh-4rem)] w-full bg-[#EDF3FF] pb-[3.63rem] lg:ml-[28%] lg:w-3/4 lg:pb-32 lg:pr-[8.69rem]">
        {children}
      </main>
    </div>
  )
}
