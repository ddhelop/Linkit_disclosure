// ProfileEditClient.tsx (클라이언트 컴포넌트)
'use client'

import { useEffect, useState } from 'react'
import LeftMenu from '@/features/profile/edit/components/common/LeftMenu'
import MiniProfileCard from '@/shared/components/MiniProfileCard'
import ProfileProgress from '@/features/profile/edit/components/common/ProfileProgress'
import { ProfileProvider } from '@/features/profile/edit/context/ProfileContext'
import { fetchProfileData } from '@/features/profile/edit/api/profileEditApi'
import { ResultType } from '../../types/ProfileLayoutType'

type ProfileEditClientProps = {
  children: React.ReactNode
}

export default function ProfileEditClient({ children }: ProfileEditClientProps) {
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
    <ProfileProvider profileData={profileData}>
      <div className="flex bg-white ">
        <aside className="flex w-[28%] flex-col items-end pr-[4.5rem] pt-[3.75rem]">
          <ProfileProgress />
          <MiniProfileCard />
          <LeftMenu />
        </aside>
        <main className="w-3/4 bg-[#EDF3FF] pb-32">{children}</main>
      </div>
    </ProfileProvider>
  )
}
