export default function IntroduceComponent() {
  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">자기소개</span>
        <span className="text-sm text-[#2563EB]">
          Tip : 본인의 경험을 바탕으로 핵심 역량과 보유 기술을 간단히 작성해주세요! (최대 300자){' '}
        </span>
      </div>

      {/* contents */}
      <div className="pt-[0.94rem] text-grey50">자기소개가 없습니다.</div>

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end">
        <button className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">수정하기</button>
      </div>
    </div>
  )
}
