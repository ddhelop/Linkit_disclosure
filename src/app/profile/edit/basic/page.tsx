import ProfileEditBasic from '@/features/profile/edit/basic/components/ProfileEditBasic'

export default function ProfileEditBasicPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">미니 프로필</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditBasic />
      </div>
    </div>
  )
}
