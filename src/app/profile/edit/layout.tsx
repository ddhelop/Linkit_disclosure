// layout.tsx

import LeftMenu from '@/features/profile/edit/components/LeftMenu'
import MiniProfileCard from '@/shared/components/MiniProfileCard'
import ProfileProgress from '@/features/profile/edit/components/ProfileProgress'

const ProfileEditLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-white pl-[8.69rem]">
      <aside className="flex w-1/4 flex-col pt-[3.75rem]">
        <ProfileProgress />
        <MiniProfileCard />
        <LeftMenu />
      </aside>
      <main
        className="w-3/4 bg-[#EDF3FF] pb-32
      "
      >
        {children}
      </main>
    </div>
  )
}

export default ProfileEditLayout
