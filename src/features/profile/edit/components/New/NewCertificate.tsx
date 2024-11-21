import { Button } from '@/shared/ui/Button/Button'
import Input from '@/shared/ui/Input/Input'
import Textarea from '@/shared/ui/TextArea/TextArea'

export default function NewCertificate() {
  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] pb-7 pt-[1.88rem]">
        {/* 자격명 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">
              자격명<span className="text-main">*</span>
            </span>
            <span className="flex text-xs text-grey50">
              <span className="text-main">*</span>은 필수항목입니다
            </span>
          </div>
          <Input placeholder="자격증 이름과 급수(점수)를 자유롭게 기재해 주세요" />
        </div>
        <div className="flex w-full gap-10">
          {/* 관련부처 */}
          <div className="flex w-[49%] flex-col gap-3">
            <div className="flex justify-between ">
              <span className="flex">
                관련부처<span className="text-main">*</span>
              </span>
            </div>
            <Input placeholder="관련 기관을 입력해 주세요" />
          </div>

          {/* 취득일 */}
          <div className="flex w-[49%] flex-col gap-3">
            <div className="flex justify-between">
              <span className="flex">
                취득일<span className="text-main">*</span>
              </span>
            </div>
            <Input placeholder="2021.03" />
          </div>
        </div>
        {/* 설명 */}
        <div className="flex w-full flex-col gap-3">
          <div className="flex justify-between">
            <span className="flex">설명</span>
          </div>
          <Textarea placeholder="자격증 취득 경위를 자유롭게 기재해 주세요" className="min-h-32" />
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-5 flex justify-end">
        <Button mode="main2" animationMode="main">
          저장하기
        </Button>
      </div>
    </>
  )
}
