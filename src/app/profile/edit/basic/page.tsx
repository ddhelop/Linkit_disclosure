import ProfileEditBasic from '@/features/profile/edit/components/ProfileEditBasic'
import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'

export default function ProfileEditBasicPage() {
  return (
    <div className="">
      <label className="text-xl font-bold">미니 프로필</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditBasic />
      </div>

      <ProfileEditBottomNav prevPath="/profile/edit/log" nextPath="/profile/edit/skills" />
    </div>
  )
}
