import ProfileEditLog from '@/features/profile/edit/log/components/ProfileEditLog'

export default function ProfileEditLogPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">나의 로그</label>

      <div className="mt-5 rounded-xl bg-white px-[1.62rem] pb-3 pt-[1.88rem]">
        <ProfileEditLog />
      </div>
    </div>
  )
}
