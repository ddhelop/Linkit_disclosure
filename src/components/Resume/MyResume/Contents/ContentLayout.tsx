import { MyResumeResponse } from '@/lib/types'
import IntroduceComponent from './IntroduceComponent'
import MyAcademicComponent from './MyAcademicComponent'

import MyAwardComponent from './MyAwardComponent'
import MyHistoryComponent from './MyHistoryComponent'
import MyLocationComponent from './MyLocationComponent'
import MyResumeProgress from './MyResumeProgress'
import MySkillComponent from './MySkillComponent'
import TeamBuildingComponent from './TeamBuildingComponent'
import MyAttachUrl from './MyAttachUrl'
import MyAttachFile from './MyAttachFile'

interface MyResumContentsProps {
  data: MyResumeResponse
}

export default function ContentLayout({ data }: MyResumContentsProps) {
  return (
    <div className="flex flex-col gap-4">
      <MyResumeProgress data={data.completionResponse} />

      {/* 자기소개 컴포넌트 */}
      <IntroduceComponent data={data.profileIntroductionResponse} />

      {/* 보유 기술 컴포넌트 */}
      <MySkillComponent />

      {/* 희망 팀빌딩 분야 컴포넌트 */}
      <TeamBuildingComponent data={data.profileTeamBuildingFieldResponse} />

      {/* 활동 지역/위치 컴포넌트 */}
      <MyLocationComponent data={data.profileRegionResponse} />

      {/* 이력 */}
      <MyHistoryComponent data={data.antecedentsResponse} />

      {/* 학력 */}
      <MyAcademicComponent data={data.educationResponse} />

      {/* 수상 */}
      <MyAwardComponent data={data.awardsResponse} />

      {/* 첨부 링크 */}
      <MyAttachUrl data={data.attachResponse.attachUrlResponseList} />

      {/* 첨부 파일 */}
      <MyAttachFile />
    </div>
  )
}
