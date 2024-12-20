import TeamEditRecruitComponent from './TeamEditRecruitComponent'

export default function TeamEditRecruitList({ params }: { params: { teamName: string } }) {
  return (
    <div className="flex flex-col">
      {/* 필터링 */}
      <div className="mt-5 flex gap-3">
        <div className="cursor-pointer rounded-[62.5rem] border border-[#B5CDFF] bg-[#D3E1FE] px-6 py-2 text-grey60">
          전체
        </div>
        <div className="cursor-pointer rounded-[62.5rem] border border-[#B5CDFF] bg-[#D3E1FE] px-6 py-2 text-grey60">
          모집중
        </div>
        <div className="cursor-pointer rounded-[62.5rem] border border-[#B5CDFF] bg-[#D3E1FE] px-6 py-2 text-grey60">
          모집완료
        </div>
      </div>

      {/* 리스트 */}
      <div className="mt-6 flex flex-col">
        <TeamEditRecruitComponent />
      </div>
    </div>
  )
}
