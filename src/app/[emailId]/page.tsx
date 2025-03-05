import { getProfileDetail } from '@/entities/profile/api/profileApi'
import { ProfileDetailData } from '@/entities/profile/model/types'
import { ProfileViewProvider } from '@/entities/profile/model/ProfileViewContext'
import ProfileViewLog from '@/features/profile/view/component/ProfileViewLog'
import ProfileViewSkills from '@/features/profile/view/component/ProfileViewSkills'
import ProfileViewHistory from '@/features/profile/view/component/ProfileViewHistory'
import ProfileViewPortFolio from '@/features/profile/view/component/ProfileViewPortFolio'
import ProfileViewEducation from '@/features/profile/view/component/ProfileViewEducation'
import ProfileViewAwards from '@/features/profile/view/component/ProfileViewAwards'
import ProfileViewLicense from '@/features/profile/view/component/ProfileViewLicense'
import ProfileViewLinks from '@/features/profile/view/component/ProfileViewLinks'
import ClientProfileWrapper from './ClientProfileWrapper'

export default async function UserProfilePage({ params }: { params: { emailId: string } }) {
  const emailId = params.emailId as string
  const profileData = await getProfileDetail(emailId)

  const sections = [
    { id: 'log', label: '활동 로그' },
    { id: 'skills', label: '보유 스킬' },
    { id: 'history', label: '이력' },
    { id: 'portfolio', label: '포트폴리오' },
    { id: 'education', label: '학력' },
    { id: 'awards', label: '수상 내역' },
    { id: 'license', label: '자격증' },
    { id: 'links', label: '링크' },
  ]

  if (!profileData) return <div>Loading...</div>

  return (
    <div className="flex w-full justify-center pt-5 lg:pl-[4.25rem] lg:pt-[3.63rem]">
      <ProfileViewProvider profileData={profileData}>
        <ClientProfileWrapper sections={sections}>
          <ProfileViewLog id="log" />
          <ProfileViewSkills id="skills" />
          <ProfileViewHistory id="history" />
          <ProfileViewPortFolio id="portfolio" />
          <ProfileViewEducation id="education" />
          <ProfileViewAwards id="awards" />
          <ProfileViewLicense id="license" />
          <ProfileViewLinks id="links" />
        </ClientProfileWrapper>
      </ProfileViewProvider>
    </div>
  )
}
