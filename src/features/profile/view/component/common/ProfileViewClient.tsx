'use client'

import { useEffect, useState } from 'react'
import { fetchProfileDetailData } from '@/features/profile/api/profileViewApi'

import ProfileScrap from './ProfileScrap'
import { ProfileViewProvider } from '@/entities/profile/model/ProfileViewContext'
import { ProfileDetailData } from '@/entities/profile/model/types'
import MiniProfileCard from '@/shared/components/MiniProfileCard'
import ProfileViewProgress from '@/features/profile/edit/components/common/ProfileViewProgress'
import ProfileMatchButton from './ProfileMatchButton'

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
        <aside className=" fixed top-16 flex h-[calc(100vh-4rem)] w-[28%] flex-col items-end pr-[4.5rem] pt-[3.75rem]">
          <div
            className="rounded-xl border border-grey30 p-4"
            style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
          >
            <ProfileViewProgress />
            <MiniProfileCard />

            {/* 내 프로필일 경우 스크랩 버튼 보이기 */}
            {!profileData.isMyProfile && <ProfileScrap />}
            {/* 내 프로필일 경우 매칭 버튼 보이기 */}
            {!profileData.isMyProfile && <ProfileMatchButton />}
          </div>
        </aside>
      </ProfileViewProvider>

      {/* 오른쪽 메인 컨텐츠 영역 */}
      <main className="ml-[28%] min-h-[calc(100vh-4rem)] w-3/4 bg-[#EDF3FF] pb-32 pr-[8.69rem]">{children}</main>
    </div>
  )
}
