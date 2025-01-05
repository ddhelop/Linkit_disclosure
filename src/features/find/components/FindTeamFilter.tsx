export default function FindTeamFilter() {
  return (
    <div
      style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)' }}
      className="grid grid-cols-4 gap-4 rounded-xl bg-white px-6 py-5"
    >
      {/* 포지션 카드 */}
      <div className="rounded-xl border border-grey30 bg-white px-6 py-5">
        <h3 className="mb-2 text-sm text-grey70">포지션</h3>
        <p className="text-xs font-normal text-grey50">어떤 포지션의 팀원이 필요하가요?</p>
      </div>

      {/* 보유 스킬 카드 */}
      <div className="rounded-xl border border-grey30 bg-white px-6 py-5">
        <h3 className="mb-2 text-sm text-grey70">보유 스킬</h3>
        <p className="text-xs font-normal text-grey50">필수적인 스킬은 무엇인가요?</p>
      </div>

      {/* 활동 지역 카드 */}
      <div className="rounded-xl border border-grey30 bg-white px-6 py-5">
        <h3 className="mb-2 text-sm text-grey70">활동 지역</h3>
        <p className="text-xs font-normal text-grey50">주로 어디서 활동하나요?</p>
      </div>

      {/* 현재 상태 카드 */}
      <div className="rounded-xl border border-grey30 bg-white px-6 py-5">
        <h3 className="mb-2 text-sm text-grey70">현재 상태</h3>
        <p className="text-xs font-normal text-grey50">팀을 찾고 있는 팀원들이 있어요</p>
      </div>
    </div>
  )
}
