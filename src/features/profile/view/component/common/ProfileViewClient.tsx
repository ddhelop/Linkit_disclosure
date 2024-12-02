'use client'
import ProfileProgress from '@/features/profile/edit/components/common/ProfileProgress'
import { ProfileProvider } from '@/features/profile/edit/context/ProfileContext'
import { ResultType } from '@/features/profile/edit/types/ProfileLayoutType'
import MiniProfileCard from '@/shared/components/MiniProfileCard'
import { fetchProfileData } from '@/features/profile/edit/api/profileEditApi'
import { useEffect, useState } from 'react'

export default function ProfileViewClient({ children }: { children: React.ReactNode }) {
  const [profileData, setProfileData] = useState<ResultType | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProfileData()
        setProfileData(data.result) // 데이터 구조에 맞춰 설정
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }
    getData()
  }, [])

  if (!profileData) return <div>Loading...</div>

  return (
    <div className="flex bg-white">
      <ProfileProvider profileData={profileData}>
        {/* 왼쪽 사이드바 영역 */}
        <aside className=" fixed top-16 flex h-[calc(100vh-4rem)] w-[28%] flex-col items-end pr-[4.5rem] pt-[3.75rem]">
          <div
            className="rounded-xl border border-grey30 p-4"
            style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
          >
            <ProfileProgress />
            <MiniProfileCard />
          </div>
        </aside>
      </ProfileProvider>

      {/* 오른쪽 메인 컨텐츠 영역 */}
      <main className="ml-[28%] min-h-[calc(100vh-4rem)] w-3/4 bg-[#EDF3FF] pb-32 pr-[8.69rem]">{children}</main>
    </div>
  )
}
