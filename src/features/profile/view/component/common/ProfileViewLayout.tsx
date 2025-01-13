'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getProfileDetail } from '@/entities/profile/api/profileApi'
import { ProfileDetailData } from '@/entities/profile/model/types'
import ProfileViewSkills from '../ProfileViewSkills'
import ProfileViewHistory from '../ProfileViewHistory'
import ProfileViewPortFolio from '../ProfileViewPortFolio'
import ProfileViewEducation from '../ProfileViewEducation'
import ProfileViewAwards from '../ProfileViewAwards'
import ProfileViewLicense from '../ProfileViewLicense'
import ProfileViewLinks from '../ProfileViewLinks'
import { ProfileViewProvider } from '@/entities/profile/model/ProfileViewContext'

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
    <ProfileViewProvider profileData={profileData}>
      <div className="flex flex-col gap-6">
        <ProfileViewSkills />
        <ProfileViewHistory />
        <ProfileViewPortFolio />
        <ProfileViewEducation />
        <ProfileViewAwards />
        <ProfileViewLicense />
        <ProfileViewLinks />
      </div>
    </ProfileViewProvider>
  )
}
