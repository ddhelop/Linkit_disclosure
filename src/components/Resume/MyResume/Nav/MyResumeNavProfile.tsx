import Image from 'next/image'

export default function MyResumeNavProfile() {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#fff] px-[1.37rem] py-[1.31rem]">
      {/* title */}
      <div className="flex w-full justify-between">
        <h3 className="w-[60%] text-lg font-bold text-grey90">사이드 프로젝트 함께 할 개발자를 찾고 있어요</h3>
        <Image src="/assets/icons/option.svg" width={24} height={24} alt="option" />
      </div>

      <span className="pt-[0.57rem] text-sm text-[#2563EB]">D-57</span>

      {/* profile */}
      <div className="flex w-full flex-col items-center pt-[1.56rem]">
        <Image
          src="/assets/intro/profile/seonjun.png"
          width={110}
          height={110}
          alt="profile"
          className="rounded-[2.1rem]"
        />

        <span className="pt-5 text-sm font-semibold text-[#2563EB]">선준</span>
        <span className="pt-1 text-sm text-grey60 opacity-60">기획, AI 엔지니어, LLM </span>
      </div>

      <div className="mt-5 flex w-full gap-2 bg-grey10 p-3">
        <span className="text-sm">💬</span>
        <div className="flex w-full justify-center">
          <span className="text-sm text-grey90">공동의 목표를 위해 가감없는 피드백</span>
        </div>
      </div>
    </div>
  )
}
