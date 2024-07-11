import { MyResumeResponse } from '@/lib/types'
import IntroduceComponent from './PrivateIntroduce'
import MyAcademicComponent from './PrivateAcademic'

import MyAwardComponent from './PrivateAward'
import MyHistoryComponent from './PrivateHistory'
import MyLocationComponent from './PrivateLocation'
import MyResumeProgress from './MyResumeProgress'
import MySkillComponent from './PrivateRole'
import TeamBuildingComponent from './PrivateTeamBuilding'
import MyAttachUrl from './PrivateAttachUrl'
import PrivateIntroduce from './PrivateIntroduce'
import PrivateRole from './PrivateRole'
import PrivateTeamBuilding from './PrivateTeamBuilding'
import PrivateLocation from './PrivateLocation'
import PrivateHistory from './PrivateHistory'
import PrivateAcademic from './PrivateAcademic'
import PrivateAward from './PrivateAward'
import PrivateAttachUrl from './PrivateAttachUrl'

interface MyResumContentsProps {
  data: MyResumeResponse
}

export default function PrivateContentLayout({ data }: MyResumContentsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* 자기소개 컴포넌트 */}
      <PrivateIntroduce data={data?.profileIntroductionResponse} />

      {/* 역할 컴포넌트 */}
      <PrivateRole data={data?.jobAndSkillResponse} />

      {/* 희망 팀빌딩 분야 컴포넌트 */}
      <PrivateTeamBuilding data={data?.profileTeamBuildingFieldResponse} />

      {/* 활동 지역/위치 컴포넌트 */}
      <PrivateLocation data={data?.profileRegionResponse} />

      {/* 이력 */}
      <PrivateHistory data={data?.antecedentsResponse} />

      {/* 학력 */}
      <PrivateAcademic data={data?.educationResponse} />

      {/* 수상 */}
      <PrivateAward data={data?.awardsResponse} />

      {/* 첨부 링크 */}
      <PrivateAttachUrl data={data?.attachResponse?.attachUrlResponseList} />
    </div>
  )
}
