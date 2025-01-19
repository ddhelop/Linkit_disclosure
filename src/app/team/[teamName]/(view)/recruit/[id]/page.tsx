import MiniTeamCard from '@/shared/components/MiniTeamCard'

import { getTeamInfo } from '@/features/team/api/teamApi'
import TeamViewRecruitDetail from '@/features/team/view/recruitment/TeamViewRecruitDetail'

export default async function TeamViewRecruitDetailPage({ params }: { params: { teamName: string; id: string } }) {
  const teamInfo = await getTeamInfo(params.teamName)

  return (
    <div className="absolute left-0 flex h-[calc(100vh-4rem)] w-full justify-center bg-white pt-[3.63rem]">
      <div className="flex w-[83%] justify-center gap-8">
        <div className="w-[49rem]">
          <TeamViewRecruitDetail teamName={params.teamName} id={params.id} />
        </div>
        <div>
          <MiniTeamCard teamInfo={teamInfo} />
        </div>
      </div>
    </div>
  )
}
