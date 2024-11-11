import ProfileEditAccount from '@/features/profile/edit/account/ProfileEditAccount'

export default function ProfileEditAccountPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">계정 설정</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditAccount />
      </div>
    </div>
  )
}
