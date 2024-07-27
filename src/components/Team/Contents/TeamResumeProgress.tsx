import { CompletionResponse, TeamCompletionResponse } from '@/lib/types'
import Image from 'next/image'

interface TeamResumContentsProps {
  data: TeamCompletionResponse
}

export default function TeamResumeProgress({ data }: TeamResumContentsProps) {
  return (
    <div className="w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem] shadow-resume-box-shadow">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">프로필 완성도 : {data?.teamCompletion}%</span>
        <span className="text-grey60">항목을 채울수록 완성도가 높아져요!</span>
      </div>

      {/* progress */}
      <div className="flex flex-col">
        {/* 수치 */}
        <div className="relative flex w-full pt-6">
          <span className="absolute right-[50%]">50%</span>
          <span className="absolute right-[20%]">80%</span>
        </div>

        {/* 진행바 */}
        <div className="mt-8 w-full rounded-lg bg-grey20 py-1">
          <div className="rounded-lg bg-[#2563EB] py-1" style={{ width: `${data?.teamCompletion}%` }}></div>
        </div>

        {/* 수치 설명 */}
        <div className="relative flex w-full pt-3">
          <div className="absolute right-[45%] flex flex-col items-center">
            <Image src="/assets/icons/reTriangle.svg" width={15} height={15} alt="re" />
            <span className="pt-1 text-grey100">프로필 열람 가능</span>
          </div>
          <div className="absolute right-[15%] flex flex-col items-center">
            <Image src="/assets/icons/reTriangle.svg" width={15} height={15} alt="re" />
            <span className="pt-1 text-grey100">매칭 요청 가능</span>
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-24 flex justify-end">
          <button className="flex items-center gap-4 rounded-[0.5rem] bg-grey20 px-[1.44rem] py-[0.88rem] text-grey100">
            <p>팀원 공고 작성하러 가기</p>
            <Image src="/assets/icons/>.svg" width={7} height={7} alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  )
}
