export default function MyAwardComponent() {
  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">수상</span>
      </div>

      {/* contents */}
      <div className="pt-[0.94rem] text-grey50">수상이력이 없습니다.</div>

      {/* button */}
      <div className="mt-[0.94rem] flex w-full justify-end">
        <button className="h-10 rounded bg-[#2563EB] px-4 text-sm text-[#fff]">추가하기</button>
      </div>
    </div>
  )
}
