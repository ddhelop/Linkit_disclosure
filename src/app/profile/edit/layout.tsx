// layout.tsx (서버 컴포넌트)

import ProfileEditClient from '@/features/profile/edit/components/common/ProfileEditClient'

const ProfileEditLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProfileEditClient>{children}</ProfileEditClient>
}
export default ProfileEditLayout
