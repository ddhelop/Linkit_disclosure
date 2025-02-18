import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import ProfileEditAwards from '@/features/profile/edit/components/ProfileEditAwards'

export default function ProfileEditAwardsPage() {
  return (
    <>
      <label className="text-xl font-bold">수상</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditAwards />
      </div>

      <ProfileEditBottomNav prevPath="/profile/edit/education" nextPath="/profile/edit/certifications" />
    </>
  )
}
