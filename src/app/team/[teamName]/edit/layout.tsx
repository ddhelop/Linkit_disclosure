// layout.tsx (서버 컴포넌트)

import TeamEditClient from '@/features/team/edit/common/TeamEditClient'

const TeamEditLayout = ({ children, params }: { children: React.ReactNode; params: { teamName: string } }) => {
  return <TeamEditClient params={params}>{children}</TeamEditClient>
}
export default TeamEditLayout
