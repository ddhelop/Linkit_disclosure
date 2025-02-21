import ProfileEditAccount from '@/features/profile/edit/components/ProfileEditAccount'

export default function ProfileEditAccountPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col px-4 pt-[4.5rem] md:items-center lg:px-0">
      <label className="flex justify-start text-2xl font-bold md:w-[44rem]">계정 설정</label>

      <div className="mt-5 rounded-xl md:w-[44rem]">
        <ProfileEditAccount />
      </div>
    </div>
  )
}
