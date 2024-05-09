'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function IntroComponentTemp() {
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
    <>
      <div
        style={{ backgroundImage: `url('/assets/intro/introBg1.png')` }}
        className="relative snap-start h-screen text-center flex flex-col items-center justify-center p-8 min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden"
      >
        <div className="flex gap-4">
          <span className="text-3xl font-medium">성공을</span>
          <Image src={'/assets/intro/lineLink.svg'} alt="line" width={89} height={1} />
          <span className="text-3xl font-medium">잇는 팀빌딩</span>
        </div>
        <div className="flex gap-12 py-12">
          <Image src={'/assets/intro/logo.svg'} alt="line" width={147} height={88} />
          <Image src={'/assets/intro/logoText.svg'} alt="line" width={250} height={65} />
        </div>

        <div className="flex flex-col pt-24">
          <span className="text-2xl font-medium">얼리버드 마감까지</span>
          <span className="text-[1.68rem] font-medium mt-4 bg-[#F1F4F980] p-5 rounded-lg">{countdown}</span>
        </div>
      </div>
    </>
  )
}
