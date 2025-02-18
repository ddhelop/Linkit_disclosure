import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import ProfileEditLinks from '@/features/profile/edit/components/ProfileEditLinks'

export default function ProfileEditLinksPage() {
  return (
    <>
      <label className="text-xl font-bold">링크</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditLinks />
      </div>

      <ProfileEditBottomNav prevPath="/profile/edit/certifications" isLastPage={true} />
    </>
  )
}
