import ProfileEditHistory from '@/features/profile/edit/history/ProfileEditHistory'

export default function ProfileEditHistoryPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">이력</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditHistory />
      </div>
    </div>
  )
}
