import { TeamIntroductionResponse } from '@/lib/types'
import TeamResumeProgress from './TeamResumeProgress'
import TeamResumeBuildingComponent2 from './TeamResumeBuildingComponent2'
import TeamResumeMemberAnnouncement from './TeamResumeMemberAnouncement'
import TeamResumeActivityWay from './TeamResumeActivityWay'
import TeamResumeIntroduce from './TeamResumeIntroduce'
import TeamResumeMember from './TeamResumeMember'
import TeamResumeHistory from './TeamResumeHistory'
import TeamResumeAttachUrl from './TeamResumeAttachUrl'

interface TeamResumContentsProps {
  data: TeamIntroductionResponse
}

export default function TeamContentLayout({ data }: TeamResumContentsProps) {
  return (
    <div className="flex flex-col gap-4">
      <TeamResumeProgress data={data?.teamCompletionResponse} />

      {/* 희망 팀빌딩 분야 */}
      <TeamResumeBuildingComponent2 data={data?.teamProfileTeamBuildingFieldResponse} />

      {/* 팀원 공고 */}
      <TeamResumeMemberAnnouncement />

      {/* 활동 방식 */}
      <TeamResumeActivityWay data={data?.activityResponse} />

      {/* 팀 소개 */}
      <TeamResumeIntroduce data={data?.teamProfileIntroductionResponse} />

      {/* 팀원 소개 */}
      <TeamResumeMember data={data?.teamMemberIntroductionResponses} />

      {/* 팀 연혁 */}
      <TeamResumeHistory data={data?.historyResponses} />

      {/* 팀 첨부 URL */}
      <TeamResumeAttachUrl data={data?.teamAttachResponse.teamAttachUrlResponseList} />
    </div>
  )
}
