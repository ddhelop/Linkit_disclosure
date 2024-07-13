'use client'
import { GetTeamMembers } from '@/lib/action'
import TeamMemberMiniProfile from './TeamMemberMiniProfile'
import { useEffect, useState } from 'react'
import { PrivateProfile } from '@/lib/types'

export default function FindMember() {
  const [profileData, setProfileData] = useState<PrivateProfile[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetTeamMembers()
      setProfileData(data.content)
    }
    fetchData()
  }, []) // 빈 배열을 의존성 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  return (
    <div className="flex w-full flex-wrap gap-6 pt-[2rem]">
      {profileData?.map((profile) => <TeamMemberMiniProfile key={profile.id} profile={profile} />)}
    </div>
  )
}
