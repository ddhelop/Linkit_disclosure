import { getProfileDetail } from '@/entities/profile/api/profileApi'

import ProfileViewLog from '@/features/profile-view/ui/ProfileViewLog'
import ProfileViewSkills from '@/features/profile-view/ui/ProfileViewSkills'
import ProfileViewHistory from '@/features/profile-view/ui/ProfileViewHistory'
import ProfileViewPortFolio from '@/features/profile-view/ui/ProfileViewPortFolio'
import ProfileViewEducation from '@/features/profile-view/ui/ProfileViewEducation'
import ProfileViewAwards from '@/features/profile-view/ui/ProfileViewAwards'
import ProfileViewLicense from '@/features/profile-view/ui/ProfileViewLicense'
import ProfileViewLinks from '@/features/profile-view/ui/ProfileViewLinks'
import { loadProfileDetailData } from '@/features/profile-view/loader'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function UserProfilePage({ params }: { params: { emailId: string } }) {
  const emailId = params.emailId as string
  // const profileData = await getProfileDetail(emailId)
  const dehydratedState = await loadProfileDetailData(emailId)

  return (
    <div className="flex w-full flex-grow flex-col justify-center gap-2 pt-5 lg:gap-6 lg:px-[4.25rem] lg:pt-[3.63rem]">
      <HydrationBoundary state={dehydratedState}>
        <ProfileViewLog emailId={emailId} />
        <ProfileViewSkills emailId={emailId} />
        <ProfileViewHistory emailId={emailId} />
        <ProfileViewPortFolio emailId={emailId} />
        <ProfileViewEducation emailId={emailId} />
        <ProfileViewAwards emailId={emailId} />
        <ProfileViewLicense emailId={emailId} />
        <ProfileViewLinks emailId={emailId} />
      </HydrationBoundary>
    </div>
  )
}
