import Image from 'next/image'

export default function TeamResumeNavProfile() {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#fff] px-[1.37rem] py-[1.31rem]">
      <div className="flex items-start gap-[1.37rem]">
        <Image src="/logo.png" width={80} height={80} alt="profile" className="rounded-2xl" />
        <div className="flex flex-col ">
          <span className="text-lg font-bold text-[#2563EB]">링킷(Linkit)</span>
          <span className="pt-[0.69rem] text-sm text-grey60">분야 | 플랫폼</span>
          <span className="text-sm text-grey60">규모 | 2-5인</span>
        </div>
        <Image
          src="/assets/icons/option.svg"
          width={24}
          height={24}
          alt="option"
          className="ml-[3.2rem] mt-1 cursor-pointer"
        />
      </div>

      {/* 설명 */}
      <div className="mt-5 flex w-full gap-2 bg-grey10 p-3">
        <span className="text-sm">💬</span>
        <div className="flex w-full justify-center">
          <span className="text-sm text-grey90">공동의 목표를 위해 가감없는 피드백</span>
        </div>
      </div>

      <div className="pt-[1.12rem] text-sm text-grey80">#해커톤 #사무실 있음 #서울시</div>
    </div>
  )
}
