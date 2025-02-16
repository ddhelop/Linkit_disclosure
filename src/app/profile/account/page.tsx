import ProfileEditAccount from '@/features/profile/edit/components/ProfileEditAccount'

export default function ProfileEditAccountPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col pt-[4.5rem] md:items-center">
      <label className="flex justify-start px-10 text-2xl font-bold md:w-[44rem] md:px-0">계정 설정</label>

      <div className="mt-5 rounded-xl md:w-[44rem]">
        <ProfileEditAccount />
      </div>
    </div>
  )
}
