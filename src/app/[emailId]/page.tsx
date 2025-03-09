import ProfileViewLog from '@/features/profile-view/ui/ProfileViewLog'
import ProfileViewSkills from '@/features/profile-view/ui/ProfileViewSkills'
import ProfileViewHistory from '@/features/profile-view/ui/ProfileViewHistory'
import ProfileViewPortFolio from '@/features/profile-view/ui/ProfileViewPortFolio'
import ProfileViewEducation from '@/features/profile-view/ui/ProfileViewEducation'
import ProfileViewAwards from '@/features/profile-view/ui/ProfileViewAwards'
import ProfileViewLicense from '@/features/profile-view/ui/ProfileViewLicense'
import ProfileViewLinks from '@/features/profile-view/ui/ProfileViewLinks'

export default function UserProfilePage({ params }: { params: { emailId: string } }) {
  const emailId = params.emailId

  return (
    <div className="flex flex-grow flex-col justify-center gap-2 pt-5 lg:gap-6 lg:px-[4.25rem] lg:pt-[3.63rem]">
      <ProfileViewLog emailId={emailId} />
      <ProfileViewSkills emailId={emailId} />
      <ProfileViewHistory emailId={emailId} />
      <ProfileViewPortFolio emailId={emailId} />
      <ProfileViewEducation emailId={emailId} />
      <ProfileViewAwards emailId={emailId} />
      <ProfileViewLicense emailId={emailId} />
      <ProfileViewLinks emailId={emailId} />
    </div>
  )
}
