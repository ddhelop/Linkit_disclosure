import TeamCreate from '@/features/team/TeamCreate'

export default function TeamNewPage() {
  return (
    <div className="flex w-full justify-center py-[3.62rem]">
      <div className="flex w-[55%] flex-col gap-5">
        <h1 className="text-xl font-semibold">팀 생성을 위해 기본 정보를 입력해 주세요</h1>
        <TeamCreate />
      </div>
    </div>
  )
}
