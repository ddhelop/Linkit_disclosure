// FindMember.tsx
'use client'
import TeamMemberMiniProfile from './TeamMemberMiniProfile'
import { useRecoilValue } from 'recoil'
import { filteredProfilesState } from '@/context/recoil-context'

export default function FindMember() {
  const profileData = useRecoilValue(filteredProfilesState)

  return (
    <div className="grid grid-cols-1 gap-4 pt-[2rem] md:grid-cols-2">
      {profileData?.map((profile) => <TeamMemberMiniProfile key={profile.id} profile={profile} />)}
    </div>
  )
}
