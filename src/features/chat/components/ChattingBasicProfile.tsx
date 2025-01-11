import Image from 'next/image'

export default function ChattingBasicProfile() {
  return (
    <>
      {/* 기본 정보 */}
      <div className="flex w-full gap-4 bg-white px-[1.88rem] py-3">
        <Image src={'/common/default_profile.svg'} width={70} height={70} alt="Profile" />

        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <div className="flex gap-3">
              <span className="text-lg font-semibold text-grey90">김링킷</span>

              <span className="flex items-center gap-1">
                <Image src={'/common/icons/blue_circle.svg'} width={6} height={6} alt="circle" />
                <span className="text-xs text-[#4D82F3]">온라인</span>
              </span>
            </div>

            <div className="flex gap-2 text-xs text-grey60">
              <span className="text-grey50">포지션 |</span> <span className="text-grey70">기획</span>
            </div>
            <div className="flex gap-2 text-xs text-grey60">
              <span className="text-grey50">지역 |</span> <span className="text-grey70">서울시 마포구</span>
            </div>
          </div>

          <Image src={'/common/icons/more_row.svg'} width={22} height={22} alt="more_row" className="cursor-pointer" />
        </div>
      </div>
    </>
  )
}
