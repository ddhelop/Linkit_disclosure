import Image from 'next/image'

export default function MiniProfileCard() {
  return (
    <>
      <div className="h-[14.5rem] w-[17.5rem] rounded-xl bg-[#EDF3FF] px-6 py-5">
        {/* 뱃지 */}
        <div className="flex gap-2">
          <div className="rounded-[0.38rem] bg-[#4D82F3] px-2 py-1 text-xs text-white">팀 찾는중</div>
        </div>

        {/* 프로필(개인)) */}
        <div className="mt-5 flex gap-3">
          <Image src="/common/default_profile.svg" width={80} height={80} className="" alt="profile" />

          <div className="flex flex-col">
            <p className="text-lg font-bold">김링킷</p>
            <div className="mt-2 flex gap-1 text-xs text-grey70">
              <p className="text-grey50">포지션 | </p> <p>기획</p>
            </div>
            <div className=" mt-1 flex gap-1 text-xs text-grey70">
              <p className="text-grey50">지역 | </p> <p>서울시 마포구</p>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="mt-5 border-[0.5px] border-grey40"></div>
      </div>
    </>
  )
}
