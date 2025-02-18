// ProfileEditClient.tsx (클라이언트 컴포넌트)
'use client'

import { useEffect, useState } from 'react'
import LeftMenu from '@/features/profile/edit/components/common/LeftMenu'

import ProfileProgress from '@/features/profile/edit/components/common/ProfileProgress'
import { fetchProfileData } from '@/features/profile/edit/api/profileEditApi'
import { ResultType } from '../../types/ProfileLayoutType'

import { ProfileEditProvider } from '../../context/ProfileEditContext'

type ProfileEditClientProps = {
  children: React.ReactNode
}

export default function ProfileEditClient({ children }: ProfileEditClientProps) {
  const [profileData, setProfileData] = useState<ResultType | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProfileData()
        setProfileData(data.result)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }
    getData()
  }, [])

  if (!profileData) return <div>Loading...</div>

  return (
    <ProfileEditProvider profileData={profileData}>
      <div className="flex bg-white">
        <aside className="fixed top-16 hidden h-[calc(100vh-4rem)] w-[28%] flex-col items-end pr-[4.5rem] pt-[3.75rem] md:flex">
          <div
            className="rounded-xl border border-grey30 p-4"
            style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
          >
            <ProfileProgress />
            <LeftMenu />
          </div>
        </aside>
        <main className="min-h-[calc(100vh-4rem)] w-full bg-[#EDF3FF] px-2 pb-32 pt-8 md:ml-[28%] md:px-[4.25rem] md:pr-[13.69rem] md:pt-[3.75rem]">
          {children}
        </main>
      </div>
    </ProfileEditProvider>
  )
}
