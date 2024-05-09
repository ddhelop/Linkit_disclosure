'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function IntroComponentTemp() {
  const [countdown, setCountdown] = useState('')

  return (
    <>
      <div className="relative snap-start h-screen text-center flex flex-col items-center justify-center p-8 min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
        <div>
          <div className="w-[31.6rem] h-[21.9rem]  shadow-frame-shaow rounded-[3.125rem] py-[1.65rem] flex flex-col items-center">
            <div className="flex gap-4 font-medium backdrop-blur-[37px]">
              <span className="">성공을</span>
              <Image src={'/assets/intro/lineLink.svg'} alt="line" width={89} height={1} />
              <span className="">잇는 팀빌딩</span>
            </div>

            <div className="flex w-[22.4rem]  justify-between pt-10">
              <div className="bg-grey10 w-[7.75rem] h-[7.75rem] rounded-[1.875rem]"></div>
              <div className="flex flex-col text-left justify-center">
                <span className="font-medium ">7월 팀빌딩을 위한</span>
                <span className="font-bold text-[2rem]">개발자 포지션</span>
              </div>
            </div>

            <div className="w-[17.18rem] h-[4.43rem] gap-7 mt-6 flex justify-center items-center bg-[#2F353C] text-[#fff] rounded-[3.75rem]">
              <span className="font-medium ml-7">사전 신청하러 가기</span>
              <Image src={'/assets/icons/right_arrow.svg'} width={17} height={1} alt="right arrow" className="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
