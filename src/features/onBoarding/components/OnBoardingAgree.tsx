'use client'

import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import { useOnBoardingAgree } from '../hooks/useOnBoardingAgree'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function OnBoardingAgree() {
  const { allChecked, checkedItems, isNextEnabled, handleCheckClick, handleAllCheckClick, submitConsentInfoHandler } =
    useOnBoardingAgree()

  const searchParams = useSearchParams()
  const userName = searchParams.get('name') || '사용자'

  const agreeItems = [
    {
      text: '(필수) 서비스 이용약관 동의',
      link: 'https://paint-crowley-ff2.notion.site/187c158365ac814da94cd29aa5864088?pvs=4',
    },
    {
      text: '(필수) 개인정보 수집 및 이용 동의',
      link: 'https://paint-crowley-ff2.notion.site/187c158365ac8153ac1ceeae451f337f?pvs=4',
    },
    { text: '(필수) 만 14세 이상입니다' },
    { text: '(선택) 광고성 정보 수신 동의' },
  ]

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mt-[4.19rem] flex w-[90%] flex-col lg:w-[35%]">
        <h1 className="text-xl font-semibold text-grey90">{userName}님의 프로필을 만들기 위해 동의가 필요해요</h1>

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
          <p className="">전체 동의하기</p>
        </div>

        {/* 개별 동의 항목 리스트 */}
        <div className="mt-7 flex w-full flex-col gap-7">
          {agreeItems.map((item, index) => (
            <div key={index} className={`flex items-center justify-between gap-6 rounded-xl`}>
              <div onClick={() => handleCheckClick(index)} className="flex cursor-pointer items-center gap-6">
                <div
                  className={`rounded-[0.6rem] border border-grey40 p-[0.54rem] ${
                    checkedItems[index] ? 'border-transparent bg-[#D3E1FE]' : ''
                  }`}
                >
                  <Image
                    src={checkedItems[index] ? '/common/icons/btn_blue_check.svg' : '/common/icons/btn_check.svg'}
                    width={16}
                    height={16}
                    alt="checkbox"
                  />
                </div>
                <p className="text-grey70">{item.text}</p>
              </div>
              {item.link && (
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-sm text-grey60 underline"
                >
                  보기
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="flex w-full justify-end">
          <Button
            className="mt-[6.94rem] text-white"
            mode="main"
            size="md"
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
