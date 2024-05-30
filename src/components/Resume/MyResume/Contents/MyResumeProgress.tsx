import Image from 'next/image'

const items = ['자기소개', '보유기술', '희망 팀빌딩 분야', '이력', '학력', '수상', '첨부']

export default function MyResumeProgress() {
  return (
    <div className="shadow-resume-box-shadow w-full rounded-2xl bg-[#fff] px-[2.06rem] py-[1.38rem]">
      {/* title */}
      <div className="flex items-center gap-[0.56rem]">
        <span className="text-lg font-semibold text-grey100">프로필 완성도 : 35%</span>
        <span className="text-grey60">완성도를 높일 수록 매칭 확률이 높아져요! </span>
      </div>

      {/* progress */}
      <div className="flex flex-col">
        {/* 수치 */}
        <div className="relative flex w-full pt-6">
          <span className="absolute right-[50%]">50%</span>
          <span className="absolute right-[20%]">80%</span>
        </div>

        {/* 진행바 */}
        <div className="mt-8 w-full rounded-lg bg-grey20 py-1"></div>

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

        {/* 항목들 */}
        <div className="flex w-full flex-col items-start pt-[3.81rem]">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2 pt-2">
              <Image src="/assets/icons/NotCheck.svg" width={16} height={16} alt="NotCheck" />
              <span className="text-grey60">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
