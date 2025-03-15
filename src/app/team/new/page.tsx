import TeamCreate from '@/features/team/TeamCreate'

export default function TeamNewPage() {
  return (
    <div className="flex w-full justify-center py-[3.62rem]">
      <div className="flex flex-col gap-5 lg:w-[55%]">
        <h1 className="px-4 font-semibold md:text-xl">팀 생성을 위해 기본 정보를 입력해 주세요</h1>
        <TeamCreate />
      </div>
    </div>
  )
}
