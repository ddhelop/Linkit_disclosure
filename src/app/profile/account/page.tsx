import ProfileEditAccount from '@/features/profile/edit/components/ProfileEditAccount'

export default function ProfileEditAccountPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center pt-[4.5rem]">
      <label className="flex w-[44rem] justify-start text-2xl font-bold">계정 설정</label>

      <div className="mt-5 w-[44rem] rounded-xl">
        <ProfileEditAccount />
      </div>
    </div>
  )
}
