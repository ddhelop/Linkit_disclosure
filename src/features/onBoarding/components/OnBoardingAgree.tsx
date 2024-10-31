'use client'

import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useOnBoardingAgree } from '../hooks/useOnBoardingAgree'

export default function OnBoardingAgree() {
  const { allChecked, checkedItems, isNextEnabled, handleCheckClick, handleAllCheckClick, submitConsentInfoHandler } =
    useOnBoardingAgree()

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-[4.19rem] flex w-[35%] flex-col">
        <h1 className="text-xl font-semibold text-grey90">뫄뫄님의 프로필을 만들기 위해 동의가 필요해요</h1>

        {/* 전체 동의하기 버튼 */}
        <div
          onClick={handleAllCheckClick}
          className={`mt-10 flex w-full cursor-pointer gap-6 rounded-xl border border-grey40 px-4 py-[0.88rem] ${
            allChecked ? 'bg-[#D3E1FE]' : 'bg-grey20'
          }`}
        >
          <Image
            src={allChecked ? '/common/icons/btn_blue_check.svg' : '/common/icons/btn_check.svg'}
            width={24}
            height={24}
            alt="checkbox"
          />
          <p className="text-lg">전체 동의하기</p>
        </div>

        {/* 개별 동의 항목 리스트 */}
        <div className="mt-7 flex w-full flex-col gap-7">
          {[
            '(필수) 서비스 이용약관 동의',
            '(필수) 개인정보 수집 및 이용 동의',
            '(필수) 만 14세 이상입니다',
            '(선택) 광고성 정보 수신 동의',
          ].map((item, index) => (
            <div key={index} className={`flex items-center justify-between gap-6 rounded-xl`}>
              <div onClick={() => handleCheckClick(index)} className="flex cursor-pointer items-center gap-6">
                <div
                  className={`rounded-[0.6rem] border border-grey40 p-[0.54rem] ${
                    checkedItems[index] ? 'border-transparent bg-[#D3E1FE]' : ''
                  }`}
                >
                  <Image
                    src={checkedItems[index] ? '/common/icons/btn_blue_check.svg' : '/common/icons/btn_check.svg'}
                    width={24}
                    height={24}
                    alt="checkbox"
                  />
                </div>
                <p className="text-grey60">{item}</p>
              </div>
              <Image src="/common/icons/right_arrow.svg" width={32} height={32} alt="arrow" />
            </div>
          ))}
        </div>

        <div className="flex w-full justify-end">
          <Button
            className="mt-9 text-white"
            mode="main"
            size="lg"
            animationMode="main"
            disabled={!isNextEnabled}
            onClick={submitConsentInfoHandler} // 동의 정보를 제출하는 버튼
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}
