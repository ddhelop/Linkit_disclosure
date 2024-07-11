import Link from 'next/link'

export default function CompleteOnBoarding() {
  return (
    <div className="bg-[#FCFCFD]">
      <div className="flex h-screen w-full flex-col overflow-hidden lg:pt-[69px]">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center rounded-[1.875rem] border border-grey30 bg-[#fff] px-[4.4rem] pb-[1.82rem] pt-[5.25rem]">
            <div className="flex flex-col items-center text-[2rem] font-bold">
              <p>가입을 축하합니다!</p>
              <p>프로필을 마저 작성하러 가시겠어요?</p>
            </div>

            <Link href="/myResume">
              <button className="mt-[5.19rem] rounded-[21rem] bg-grey80 px-[5.8rem] py-[1.37rem] text-[1.66rem] text-[#fff]">
                네, 채우러 갈래요!
              </button>
            </Link>

            <Link href="/">
              <div className="cursor-pointer border-b border-grey60 pt-[1rem] text-grey60">
                아니오, 먼저 둘러볼래요!
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
