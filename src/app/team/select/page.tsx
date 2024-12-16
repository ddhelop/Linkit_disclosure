import TeamSelect from '@/features/team/TeamSelect'

export default function TeamSelectPage() {
  return (
    <div className={`flex  h-[calc(100vh-4rem)] flex-col items-center`}>
      <div className="flex w-[80%] flex-col pt-[5rem]">
        <h1 className="text-2xl font-bold">팀 선택</h1>
        <p className="pt-2 text-xs font-normal text-grey60">팀을 선택해 주세요</p>
        <TeamSelect />
      </div>
    </div>
  )
}
