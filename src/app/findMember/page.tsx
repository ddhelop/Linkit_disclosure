import FindMember from '@/components/Find/Member/FindMember'
import FindMemberLeftNav from '@/components/Find/Member/FindMemberLeftNav'

export default function FindingMemberPage() {
  return (
    <div className="flex w-full flex-col justify-center bg-[#fff] pt-[61px]">
      <div className="flex flex-col items-center bg-[#fff] py-[2.88rem]">
        <div className="text-left">
          <p className="text-2xl font-bold text-grey90">팀원 찾기</p>
          <p className="pt-[0.31rem] text-lg text-grey90">
            공모전부터 사이드 프로젝트, 창업 초기 멤버까지 함께 할 팀원을 찾아 보세요!
          </p>
        </div>
      </div>

      <div className="flex w-full justify-center bg-[#F6F8FC] pb-24">
        <div className=" flex w-full justify-center gap-[1.5rem] pt-[2.63rem] ">
          {/* 팀원 찾기 왼쪽 필터 */}
          <div className="flex w-[16rem] justify-end">
            <FindMemberLeftNav />
          </div>

          {/* 팀원 프로필 리스트 */}
          <div className="w-[47rem] ">
            <FindMember />
          </div>
        </div>
      </div>
    </div>
  )
}
