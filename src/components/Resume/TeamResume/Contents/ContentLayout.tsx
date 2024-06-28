import { TeamIntroductionResponse } from '@/lib/types'
import TeamResumeProgress from './TeamResumeProgress'
import TeamBuildingComponent2 from './TeamBuildingComponent2'
import TeamMemberAnouncement from './TeamMemberAnouncement'
import TeamActivityWay from './TeamActivityWay'
import TeamIntroduce from './TeamIntroduce'

interface TeamResumContentsProps {
  data: TeamIntroductionResponse
}

export default function TeamContentLayout({ data }: TeamResumContentsProps) {
  return (
    <div className="flex flex-col gap-4">
      <TeamResumeProgress data={data?.teamCompletionResponse} />

      {/* 희망 팀빌딩 분야 */}
      <TeamBuildingComponent2 data={data?.teamProfileTeamBuildingFieldResponse} />

      {/* 팀원 공고 */}
      <TeamMemberAnouncement />

      {/* 활동 방식 */}
      <TeamActivityWay />

      {/* 팀 소개 */}
      <TeamIntroduce data={data?.teamProfileIntroductionResponse} />
    </div>
  )
}
