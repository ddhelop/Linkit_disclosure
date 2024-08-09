import { CompletionResponse } from '@/lib/types'
import Image from 'next/image'

interface MyResumeCompletionProps {
  data: CompletionResponse
}

export default function MyResumeProgress({ data }: MyResumeCompletionProps) {
  return (
    <div className="w-full rounded-2xl bg-[#fff] px-4 pb-20 pt-4 shadow-resume-box-shadow sm:px-[2.06rem] sm:pt-[1.38rem]">
      {/* title */}
      <div className="flex flex-col gap-[0.56rem] sm:flex-row sm:items-center">
        <span className="text-base font-semibold text-grey100 sm:text-lg">프로필 완성도 : {data?.completion}%</span>
        <span className="text-sm text-grey60 sm:text-base">항목을 채울수록 완성도가 높아져요!</span>
      </div>

      {/* progress */}
      <div className="flex flex-col">
        {/* 수치 */}
        <div className="relative hidden w-full pt-6 text-xs sm:flex ">
          <span className="absolute right-[50%]">50%</span>
          <span className="absolute right-[20%]">80%</span>
        </div>

        {/* 진행바 */}
        <div className="mt-8 flex w-full items-center rounded-lg bg-grey20">
          <div className="rounded-lg bg-[#2563EB] py-1" style={{ width: `${data?.completion}%` }}></div>
        </div>

        {/* 수치 설명 */}
        <div className="relative flex w-full pt-3 text-xs sm:text-base">
          <div className="absolute right-[45%] flex flex-col items-center">
            <Image src="/assets/icons/reTriangle.svg" width={15} height={15} alt="re" className="h-auto w-auto" />
            <span className="pt-1 text-grey100">프로필 열람 가능</span>
          </div>
          <div className="absolute right-[15%] flex flex-col items-center">
            <Image src="/assets/icons/reTriangle.svg" width={15} height={15} alt="re" className="h-auto w-auto" />
            <span className="pt-1 text-grey100">매칭 요청 가능</span>
          </div>
        </div>
      </div>
    </div>
  )
}
