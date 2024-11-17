import ProfileEditAwards from '@/features/profile/edit/components/ProfileEditAwards'

export default function ProfileEditAwardsPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">수상</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditAwards />
      </div>
    </div>
  )
}
