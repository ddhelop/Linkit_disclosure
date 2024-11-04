// layout.tsx

import LeftMenu from '@/features/profile/edit/components/LeftMenu'
import MiniProfileCard from '@/shared/components/MiniProfileCard'
import { fetchProfileData } from './api/profileEditApi'
import { cookies } from 'next/headers'
import ProfileProgress from '@/features/profile/edit/components/ProfileProgress'

const ProfileEditLayout = async ({ children }: { children: React.ReactNode }) => {
  // const cookieStore = cookies()
  // const accessToken = cookieStore.get('access-token')?.value
  // if (!accessToken) {
  //   return <div>로그인이 필요합니다.</div>
  // }
  // const profileData = await fetchProfileData(accessToken) // 서버에서 데이터 가져오기
  // console.log('profileData:', profileData)

  return (
    <div className="flex bg-white px-[8.69rem]">
      <aside className="flex w-1/4 flex-col pt-[3.75rem]">
        <ProfileProgress />
        <MiniProfileCard />
        <LeftMenu />
      </aside>
      <main className="w-3/4">{children}</main>
    </div>
  )
}

export default ProfileEditLayout
