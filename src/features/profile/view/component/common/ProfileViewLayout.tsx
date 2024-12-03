'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ProfileProvider } from '@/entities/profile/model/ProfileContext'
import { getProfileDetail } from '@/entities/profile/api/profileApi'
import { ProfileDetailData } from '@/entities/profile/model/types'
import ProfileViewSkills from '../ProfileViewSkills'
import ProfileViewHistory from '../ProfileViewHistory'

export default function ProfileViewLayout() {
  const params = useParams()
  const [profileData, setProfileData] = useState<ProfileDetailData | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const emailId = params.emailId as string
        const data = await getProfileDetail(emailId)
        setProfileData(data)
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }
    getData()
  }, [params.emailId])

  if (!profileData) return <div>Loading...</div>

  return (
    <ProfileProvider profileData={profileData}>
      <div className="flex flex-col gap-6">
        <ProfileViewSkills />
        <ProfileViewHistory />
      </div>
    </ProfileProvider>
  )
}
