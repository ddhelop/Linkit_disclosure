import ProfileEditBasic from '@/features/profile/edit/components/ProfileEditBasic'

export default function ProfileEditBasicPage() {
  return (
    <>
      <label className="text-xl font-bold">미니 프로필</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditBasic />
      </div>
    </>
  )
}
