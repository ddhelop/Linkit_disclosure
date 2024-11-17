import NewAwards from '@/features/profile/edit/components/New/NewAwards'
import NewHistory from '@/features/profile/edit/components/New/NewHistory'

export default function ProfileEditNewAwardsPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <label className="text-xl font-bold">수상</label>

      <div className="mt-5 rounded-xl">
        <NewAwards />
      </div>
    </div>
  )
}
