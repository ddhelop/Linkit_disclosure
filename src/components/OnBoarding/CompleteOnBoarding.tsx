export default function CompleteOnBoarding() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#FCFCFD] pt-[68px]">
      <div className="flex w-[37.25rem] flex-col items-center rounded-3xl border border-grey40 p-9">
        <span className="text-[2rem] font-bold">가입을 축하합니다!</span>
        <span className="text-[2rem] font-bold">프로필 마저 작성 해봐요</span>

        <button className="mt-9 rounded-full bg-grey80 px-14 py-[1.37rem] text-[1.66rem] text-[#fff]">
          프로필 마저 작성하기
        </button>

        <div className="cursor-pointer border-b border-grey60 pt-4 text-grey60">예비 팀원 둘러보기</div>
      </div>
    </div>
  )
}
