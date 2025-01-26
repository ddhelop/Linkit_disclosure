import ProfileEditHistory from '@/features/profile/edit/components/ProfileEditHistory'

export default function ProfileEditHistoryPage() {
  return (
    <>
      <label className="text-xl font-bold">이력</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditHistory />
      </div>
    </>
  )
}
