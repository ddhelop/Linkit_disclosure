import IntroduceComponent from './IntroduceComponent'
import MyAcademicComponent from './MyAcademicComponent'
import MyAttachFile from './MyAttachFile'
import MyAwardComponent from './MyAwardComponent'
import MyHistoryComponent from './MyHistoryComponent'
import MyLocationComponent from './MyLocationComponent'
import MyResumeProgress from './MyResumeProgress'
import MySkillComponent from './MySkillComponent'
import TeamBuildingComponent from './TeamBuildingComponent'

export default function ContentLayout() {
  return (
    <div className="flex flex-col gap-4">
      <MyResumeProgress />

      {/* 자기소개 컴포넌트 */}
      <IntroduceComponent />
      <MySkillComponent />
      <TeamBuildingComponent />
      <MyLocationComponent />
      <MyHistoryComponent />
      <MyAcademicComponent />
      <MyAwardComponent />
      <MyAttachFile />
    </div>
  )
}
