import ProfileEditLog from '@/features/profile/edit/components/ProfileEditLog'

export default function ProfileEditLogPage() {
  return (
    <>
      <label className="text-xl font-bold">나의 로그</label>

      <div className="mt-5">
        <ProfileEditLog />
      </div>
    </>
  )
}
