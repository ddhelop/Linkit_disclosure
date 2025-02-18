import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import ProfileEditEducation from '@/features/profile/edit/components/ProfileEditEducation'

export default function ProfileEditEducationPage() {
  return (
    <>
      <label className="text-xl font-bold">학력</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditEducation />
      </div>

      <ProfileEditBottomNav prevPath="/profile/edit/portfolio" nextPath="/profile/edit/awards" />
    </>
  )
}
