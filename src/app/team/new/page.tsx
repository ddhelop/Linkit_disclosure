import TeamCreate from '@/features/team/TeamCreate'

export default function TeamNewPage() {
  return (
    <div className="flex w-full justify-center py-[3.62rem]">
      <div className="flex w-[55%] flex-col gap-5">
        <h1 className="text-xl font-semibold">팀 만들기</h1>
        <TeamCreate />
      </div>
    </div>
  )
}
