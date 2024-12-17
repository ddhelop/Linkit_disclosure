import Input from '@/shared/ui/Input/Input'

export default function TeamEditProductNew() {
  return (
    <div className="mt-5 flex flex-col gap-10 rounded-xl bg-white px-[2.8rem] py-[2.4rem]">
      {/* 프로덕트명 */}
      <div className="flex w-full flex-col justify-between gap-3 ">
        <div className="flex justify-between ">
          <span className="flex gap-1 text-grey80">
            프로덕트명<p className="text-main">*</p>
          </span>
          <span className="flex items-center text-xs text-grey50">
            <p className="text-main">*</p>은 필수항목입니다
          </span>
        </div>
        <Input placeholder="프로덕트명을 입력해주세요" />
      </div>

      {/* 한줄소개 */}
      <div className="flex w-full flex-col justify-between gap-3 ">
        <span className="flex gap-1 text-grey80">
          한줄소개<p className="text-main">*</p>
        </span>

        <Input placeholder="프로젝트를 한 줄로 소개해주세요 (60자 이내)" />
      </div>
    </div>
  )
}
