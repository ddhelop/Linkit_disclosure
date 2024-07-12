import TeamBuildingComponent2 from './TeamBuildingComponent'
import TeamMemberAnouncement from './TeamMemberAnouncement'
import TeamActivityWay from './TeamActivityWay'
import TeamIntroduce from './TeamIntroduce'
import TeamMember from './TeamMember'
import { TeamIntroductionResponse } from '@/lib/types'
import TeamResumeHistory from './TeamResumeHistory'
import TeamAttachUrl from './TeamAttachUrl'
import TeamBuildingComponent from './TeamBuildingComponent'

interface TeamResumContentsProps {
  data: TeamIntroductionResponse
}

export default function TeamContentLayout({ data }: TeamResumContentsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* 희망 팀빌딩 분야 */}
      <TeamBuildingComponent data={data?.teamProfileTeamBuildingFieldResponse} />

      {/* 팀원 공고 */}
      <TeamMemberAnouncement data={data?.teamMemberAnnouncementResponses} />

      {/* 활동 방식 */}
      <TeamActivityWay data={data?.activityResponse} />

      {/* 팀 소개 */}
      <TeamIntroduce data={data?.teamProfileIntroductionResponse} />

      {/* 팀원 소개 */}
      <TeamMember data={data?.teamMemberIntroductionResponses} />

      {/* 팀 연혁 */}
      <TeamResumeHistory data={data?.historyResponses} />

      {/* 팀 첨부 URL */}
      <TeamAttachUrl data={data?.teamAttachResponse.teamAttachUrlResponseList} />
    </div>
  )
}
