// layout.tsx (서버 컴포넌트)

import ProfileViewClient from '@/features/profile/view/component/common/ProfileViewClient'

const ProfileViewLayout = ({ children, params }: { children: React.ReactNode; params: { emailId: string } }) => {
  return <ProfileViewClient params={params}>{children}</ProfileViewClient>
}
export default ProfileViewLayout
