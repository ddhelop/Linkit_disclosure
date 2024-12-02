// layout.tsx (서버 컴포넌트)

import ProfileViewClient from '@/features/profile/view/component/common/ProfileViewClient'

const ProfileViewLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProfileViewClient>{children}</ProfileViewClient>
}
export default ProfileViewLayout
