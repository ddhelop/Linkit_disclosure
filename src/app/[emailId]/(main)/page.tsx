import ProfileViewLog from '@/features/profile/log/ui/ProfileViewLog'
import ProfileViewSkills from '@/features/profile-view/ui/ProfileViewSkills'
import ProfileViewHistory from '@/features/profile-view/ui/ProfileViewHistory'
import ProfileViewPortFolio from '@/features/profile-view/ui/ProfileViewPortFolio'
import ProfileViewEducation from '@/features/profile-view/ui/ProfileViewEducation'
import ProfileViewAwards from '@/features/profile-view/ui/ProfileViewAwards'
import ProfileViewLicense from '@/features/profile-view/ui/ProfileViewLicense'
import ProfileViewLinks from '@/features/profile-view/ui/ProfileViewLinks'
import ProfileProgress from '@/features/profile-view/ui/ProfileViewProgress'
import { getProfileDetail } from '@/features/profile-view/api/ProfileViewApi'

export async function generateMetadata({ params }: { params: { emailId: string } }) {
  const emailId = params.emailId
  const userData = await getProfileDetail(emailId)
  const name = userData.result.profileInformMenu.memberName
  const profileImage = userData.result.profileInformMenu.profileImagePath
  return {
    title: `${name}`,
    description: `${name}님의 포트폴리오`,
    openGraph: {
      title: `${name} 프로필`,
      description: '경력, 프로젝트, 스킬 정보를 포함한 프로필 페이지입니다.',
      url: `https://linkit.im/profile/${emailId}`,
      images: [
        {
          url: profileImage,
          width: 600,
          height: 600,
        },
      ],
    },
  }
}

export default function UserProfilePage({ params }: { params: { emailId: string } }) {
  const emailId = params.emailId

  return (
    <div className="flex gap-[3rem] pt-5 lg:px-[4.25rem] lg:pt-[3.63rem]">
      <div className="flex flex-grow flex-col justify-center gap-2 lg:gap-6 ">
        <ProfileViewLog emailId={emailId} />
        <ProfileViewSkills emailId={emailId} />
        <ProfileViewHistory emailId={emailId} />
        <ProfileViewPortFolio emailId={emailId} />
        <ProfileViewEducation emailId={emailId} />
        <ProfileViewAwards emailId={emailId} />
        <ProfileViewLicense emailId={emailId} />
        <ProfileViewLinks emailId={emailId} />
      </div>

      <div className=" hidden flex-col gap-2 lg:flex">
        <ProfileProgress emailId={emailId} />
      </div>
    </div>
  )
}
