import ProfileEditBottomNav from '@/features/profile/edit/components/common/ProfileEditBottomNav'
import ProfileEditPortfolio from '@/features/profile/edit/components/ProfileEditPortfolio'

export default function ProfileEditPortFolio() {
  return (
    <>
      <label className="text-xl font-bold">포트폴리오</label>

      <div className="mt-5 rounded-xl">
        <ProfileEditPortfolio />
      </div>

      <ProfileEditBottomNav nextPath="/profile/edit/education" prevPath="/profile/edit/history" />
    </>
  )
}
