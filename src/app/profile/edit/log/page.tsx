import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import ProfileEditLog from '@/features/profile/edit/components/ProfileEditLog'

export default function ProfileEditLogPage() {
  return (
    <div className="flex h-full flex-col bg-[#EDF3FF] ">
      <label className="text-xl font-bold">나의 로그</label>

      <div className="mt-5">
        <ProfileEditLog />
      </div>

      <ProfileEditBottomNav nextPath="/profile/edit/basic" isFirstPage={true} />
    </div>
  )
}
