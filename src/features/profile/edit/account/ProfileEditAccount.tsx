'use client'
import Input from '@/shared/ui/Input/Input'

import { usePhoneNumberFormatter } from '@/shared/hooks/usePhoneNumberFormatter'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button/Button'

export default function ProfileEditAccount() {
  const { phoneNumber, setPhoneNumber } = usePhoneNumberFormatter()

  return (
    <>
      <div className="flex flex-col gap-10 rounded-xl bg-white px-[2.88rem] py-10">
        {/* 이름 */}
        <div className="flex flex-col gap-3">
          <span>이름</span>
          <Input placeholder="이름을 입력해주세요" className="py-3" />
        </div>

        {/* 연락처 */}
        <div className="flex flex-col gap-3">
          <span>연락처</span>
          <Input
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="연락처를 입력해주세요"
            className="py-3"
            type="text"
          />
        </div>

        {/* 연동 이메일 */}
        <div className="flex flex-col gap-3">
          <div className="flex w-full justify-between">
            <span>연동 이메일</span>
            <button className="rounded-[0.25rem] bg-[#EDF3FF] px-3 text-xs text-main">변경하기</button>
          </div>
          <div className="rounded-xl border border-grey40 bg-grey20 px-6 py-3 text-grey50">clfgnm9@naver.com</div>
        </div>

        {/* 동의 */}
        <div className="flex cursor-pointer items-center gap-3">
          <div className={`rounded-[0.6rem] border border-grey40 bg-grey20 p-[0.54rem]`}>
            <Image src={'/common/icons/btn_check.svg'} width={16} height={16} alt="checkbox" />
          </div>
          <span className="text-grey70">광고성 정보 수신 동의</span>
        </div>
      </div>

      <div className="mt-5 flex w-full justify-end">
        <Button mode="main" animationMode="main" size="md">
          저장하기
        </Button>
      </div>
    </>
  )
}
