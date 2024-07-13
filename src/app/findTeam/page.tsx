import FindTeam from '@/components/Find/Team/FindTeam'
import FindTeamLeftNav from '@/components/Find/Team/FindTeamLeftNav'

export default function FindingMemberPage() {
  return (
    <div className="flex w-full flex-col justify-center pt-[61px]">
      <div className="flex flex-col items-center bg-[#fff] py-[2.88rem]">
        <div className="text-left">
          <p className="text-2xl font-bold text-grey90">팀 찾기</p>
          <p className="pt-[0.31rem] text-lg text-grey90">
            공모전부터 사이드 프로젝트, 창업 팀까지 합류하고 싶은 팀을 찾아보세요!{' '}
          </p>
        </div>
      </div>

      <div className="flex w-full justify-center bg-grey10 pb-24">
        <div className="flex w-full justify-center gap-[2.69rem] pt-[2.63rem]">
          <div>
            <FindTeamLeftNav />
          </div>
          <div>
            <FindTeam />
          </div>
        </div>
      </div>
    </div>
  )
}
