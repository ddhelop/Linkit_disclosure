'use client'

import Input from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { useOnBoarding } from '../hooks/useOnBoarding'

export default function OnBoardingInfo() {
  const { name, phoneNumber, email, setName, setPhoneNumber, isButtonEnabled, submitOnBoardingInfo } = useOnBoarding()

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-[4.19rem] flex w-[90%] flex-col lg:w-[35%]">
        <h1 className="text-xl font-semibold text-grey90">기본 정보를 입력해주세요.</h1>
        <p className="mt-3 text-sm text-grey50">입력한 정보는 마이페이지에서 확인하고 수정할 수 있어요</p>

        <div className="mt-9 flex flex-col">
          <h2 className="text-grey60">이름</h2>
          <Input value={name} onChange={setName} placeholder="이름을 입력해주세요." className="mt-3" />
        </div>

        <div className="mt-7 flex flex-col">
          <h2 className="text-grey60">연락처</h2>
          <Input
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="전화번호를 입력해주세요."
            className="mt-3"
            type="text"
          />
        </div>

        <div className="mt-7 flex flex-col">
          <h2 className="text-grey60">이메일</h2>
          <div className="mt-3 rounded-xl border border-grey30 px-6 py-3 text-grey40">{email}</div>
        </div>

        <p className="mt-3 text-xs leading-4 text-grey70">*매칭 성사 시 해당 이메일 주소를 상대방이 볼 수 있어요</p>
        <div className="flex w-full justify-end">
          <Button
            className="mt-9 text-white"
            mode="main"
            size="lg"
            animationMode="main"
            disabled={!isButtonEnabled}
            onClick={submitOnBoardingInfo}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}
