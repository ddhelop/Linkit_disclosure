// layout.tsx (서버 컴포넌트)

import TeamEditClient from '@/features/team/edit/common/TeamEditClient'

const TeamEditLayout = ({ children }: { children: React.ReactNode }) => {
  return <TeamEditClient>{children}</TeamEditClient>
}
export default TeamEditLayout
