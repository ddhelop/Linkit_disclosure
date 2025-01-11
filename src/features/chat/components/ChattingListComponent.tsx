import Image from 'next/image'

export default function ChattingListComponent() {
  return (
    <div className="flex w-full cursor-pointer gap-3 rounded-xl border border-grey20 p-4 hover:bg-grey10">
      <Image src={'/common/default_profile.svg'} width={60} height={60} alt="Profile" />

      <div className="flex w-full flex-col gap-[0.38rem]">
        <div className="flex w-full items-center justify-between">
          <span className="font-semibold text-grey90">김링킷</span>
          <span className="text-xs font-normal text-grey70">3시간전</span>
        </div>

        <div className="w-[90%] text-xs text-grey60">
          안녕하세요 현재 이런 상황인데 혹시 같이 일해 볼 생각이 있는...
        </div>
      </div>
    </div>
  )
}
