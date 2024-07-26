// FindingMemberPage.tsx
import Banner from '@/components/Find/Banner'
import FindTeam from '@/components/Find/Team/FindTeam'
import FindTeamLeftNav from '@/components/Find/Team/FindTeamLeftNav'

export default function FindingMemberPage() {
  return (
    <div className="flex w-full flex-col justify-center pt-[61px]">
      <Banner
        imgSrc="/assets/images/Find_Private_Banner.png"
        title="🚀 팀원 찾기"
        description="공모전부터 사이드 프로젝트, 창업 팀까지 합류하고 싶은 팀을 찾아보세요!"
        scrolledTitle="👋 팀 찾기"
        scrolledDescription="공모전부터 사이드 프로젝트, 창업 초기 멤버까지 함께 할 팀원을 찾아 보세요!"
      />

      <div className="flex w-full justify-center bg-grey10 pb-24 pt-[18rem]">
        <div className="flex w-full justify-center gap-[1.5rem]">
          <div className="flex w-[16rem] justify-end">
            <FindTeamLeftNav />
          </div>
          <div className="w-[47rem]">
            <FindTeam />
          </div>
        </div>
      </div>
    </div>
  )
}
