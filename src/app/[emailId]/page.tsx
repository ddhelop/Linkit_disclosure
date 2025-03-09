import { getProfileDetail } from '@/entities/profile/api/profileApi'

import { ProfileViewProvider } from '@/entities/profile/model/ProfileViewContext'
import ProfileViewLog from '@/features/profile/view/component/ProfileViewLog'
import ProfileViewSkills from '@/features/profile/view/component/ProfileViewSkills'
import ProfileViewHistory from '@/features/profile/view/component/ProfileViewHistory'
import ProfileViewPortFolio from '@/features/profile/view/component/ProfileViewPortFolio'
import ProfileViewEducation from '@/features/profile/view/component/ProfileViewEducation'
import ProfileViewAwards from '@/features/profile/view/component/ProfileViewAwards'
import ProfileViewLicense from '@/features/profile/view/component/ProfileViewLicense'
import ProfileViewLinks from '@/features/profile/view/component/ProfileViewLinks'

export default async function UserProfilePage({ params }: { params: { emailId: string } }) {
  const emailId = params.emailId as string
  const profileData = await getProfileDetail(emailId)

  return (
    <div className="flex w-full flex-grow flex-col justify-center gap-2 pt-5 lg:gap-6 lg:pl-[4.25rem] lg:pt-[3.63rem]">
      <ProfileViewProvider profileData={profileData}>
        <ProfileViewLog />
        <ProfileViewSkills />
        <ProfileViewHistory />
        <ProfileViewPortFolio />
        <ProfileViewEducation />
        <ProfileViewAwards />
        <ProfileViewLicense />
        <ProfileViewLinks />
      </ProfileViewProvider>
    </div>
  )
}
