'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function IntroComponent4() {
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const targetDate = new Date('2024-05-20T00:00:00').getTime() // 목표 날짜 설정 및 숫자로 변환
    const interval = setInterval(() => {
      const now = new Date().getTime() // 현재 날짜를 숫자로 변환
      const difference = targetDate - now // 숫자형 Date 값들의 차이 계산

      if (difference <= 0) {
        clearInterval(interval)
        setCountdown('00일 00시간 00분 00초')
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown(
        `${days}일 ${hours.toString().padStart(2, '0')}시간 ${minutes.toString().padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`,
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(180deg, #F1F3F7 19.19%, rgba(252, 252, 253, 0) 112.86%), url("/assets/intro/section4bg.png")',
      }}
      className="w-full snap-start h-screen flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden py-24"
    >
      <div className="w-full flex flex-col items-center mt-12">
        <span className="w-[17.3rem] text-[1.25rem] text-grey70 font-medium bg-grey30 text-center py-[0.44rem] rounded-lg">
          {countdown}
        </span>
        <span className="text-[1.8rem] lg:text-[2.62rem] font-bold pt-3">현재 사전 신청 진행중이에요</span>
        <span className="text-base lg:text-xl text-grey70 font-medium pt-2">
          사전 신청 등록하고 정규 프로필까지
          <br className="lg:hidden" />
          등록 완료하면 스타벅스 커피 쿠폰 지급
        </span>
        <span className="text-[0.93rem] text-grey50 font-medium pt-2">*추첨 된 100명에게 지급될 예정입니다</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-24">
        <div className="flex flex-col items-center w-[24.1rem] h-[18.8rem] bg-[#fff] rounded-[0.625rem] px-[3.25rem] py-7 ">
          <span className="text-2xl font-bold">사전 프로필 등록</span>
          <span className="text-sm text-grey70 font-medium pt-1 ">05월 15일부터 06월 30일까지</span>

          <div className="flex flex-col gap-2 pt-5">
            <div className="w-[17.6rem] h-[3.1rem] bg-grey20 text-grey100 font-me rounded-md flex justify-center items-center cursor-pointer">
              1. 참여하고 싶은 프로젝트 정하기 ㅤ&gt;
            </div>

            <div className="w-[17.6rem] h-[3.1rem] bg-grey20 text-grey100 font-me rounded-md flex justify-center items-center cursor-pointer">
              2. 1분만에 프로필 등록하기 ㅤ&gt;
            </div>

            <div className="w-[17.6rem] h-[3.1rem] bg-[#00704A] text-[#fff] font-me rounded-md flex justify-center items-center cursor-pointer">
              2. 1분만에 프로필 등록하기 ㅤ&gt;
            </div>
            <span className="text-[0.68rem] text-grey50 font-medium text-center">
              *추첨 된 100명에게 지급될 예정입니다
            </span>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-center w-[24.1rem] h-[18.8rem] bg-grey20 rounded-[0.625rem] px-[3.25rem] py-7">
          <span className="text-2xl font-bold text-grey70">정규 프로필 등록</span>

          <span className="text-[2.625rem] text-grey50 font-bold pt-[3.4rem]">Coming Soon</span>
          <span className="text-2xl text-grey50 font-bold pt-1">06월 30일 오픈</span>
        </div>
        <div className="hidden lg:flex flex-col items-center w-[24.1rem] h-[18.8rem] bg-[#fff] rounded-[0.625rem] px-[3.25rem] py-7">
          <span className="text-2xl font-bold">여름 팀빌딩 시작</span>
          <span className="text-sm text-grey70 font-medium pt-1">6월 30일부터</span>

          <span className="text-[1.81rem] text-grey50 font-bold pt-9 text-center">
            프로필 작성 후<br /> 나와 맞는 팀원 찾기!
          </span>
        </div>
      </div>
    </div>
  )
}
