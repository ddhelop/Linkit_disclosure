'use client'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'

export default function LoggedInLanding1() {
  const [isHovered, setIsHovered] = useState(false)
  const leftControls = useAnimation()
  const rightControls = useAnimation()

  const handleMouseEnterLeft = () => {
    setIsHovered(true)
    leftControls.start({ scale: 1.05, transition: { duration: 0.3 } })
    rightControls.start({ scale: 0.95, transition: { duration: 0.3 } })
  }

  const handleMouseEnterRight = () => {
    setIsHovered(true)
    leftControls.start({ scale: 0.95, transition: { duration: 0.3 } })
    rightControls.start({ scale: 1.05, transition: { duration: 0.3 } })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    leftControls.start({ scale: 1, transition: { duration: 0.3 } })
    rightControls.start({ scale: 1, transition: { duration: 0.3 } })
  }
  return (
    <div
      // style={{ backgroundImage: 'url("/assets/intro/section3bg.png")' }}
      className="relative flex h-screen min-h-screen w-full snap-mandatory snap-start snap-always flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat px-4 lg:px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
        }}
        className="sm:pt-[6.56rem]"
      >
        <h1 className="text-center text-[1.8rem] font-bold text-main  sm:text-[3.375rem]">
          성공적인 팀을 이루는
          <br /> 가장 쉬운 방법
        </h1>
        <p className="pt-4 text-xs text-grey70 sm:text-sm lg:text-[1.1875rem]">
          지금 바로 내 이력서/팀 소개서를 등록하고 성공적인 팀빌딩을 시작하세요!
        </p>
      </motion.div>

      <div className="mt-[1.5rem] flex w-full flex-col items-center justify-center gap-[0.88rem] sm:mt-[4rem] sm:flex-row">
        <motion.div
          animate={leftControls}
          onMouseEnter={handleMouseEnterLeft}
          onMouseLeave={handleMouseLeave}
          className="flex flex-col gap-1 rounded-2xl border border-grey30 bg-white px-[1.69rem] py-5 shadow-2xl sm:w-[25rem]"
        >
          <p className="hidden text-[2rem] sm:flex">👋</p>
          <p className="text-xl font-bold text-grey100 lg:text-2xl">내 이력서 등록하기</p>
          <p className="text-sm text-grey60 lg:text-base">나의 역량을 발휘하여 함께 할 팀원을 찾고 있어요</p>

          <div className="mt-5 flex w-full justify-end">
            <Link href="/myResume">
              <button className="flex w-full gap-[1.27rem] rounded-[0.31rem] bg-[#282C31] px-[1.41rem] py-[0.92rem] text-sm text-white hover:bg-main sm:w-auto lg:text-base">
                <p>내 이력서 바로가기</p>
                <p className="hidden rounded-full bg-black px-2 lg:flex">+</p>
              </button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          animate={rightControls}
          onMouseEnter={handleMouseEnterRight}
          onMouseLeave={handleMouseLeave}
          className="flex h-auto flex-col gap-1 rounded-2xl border border-grey30 bg-white px-[1.69rem] py-5 shadow-2xl sm:w-[25rem]"
        >
          <p className="hidden text-[2rem] sm:flex">🚀</p>
          <p className="text-xl font-bold text-grey100 lg:text-2xl">팀 소개서 등록하기</p>
          <p className="text-sm text-grey60 lg:text-base">우리 팀에 필요한 역량을 가진 멤버를 구하고 싶어요</p>

          <div className="mt-5 flex w-full justify-end">
            <Link href="/TeamResume">
              <button className="flex gap-[1.27rem] rounded-[0.31rem] bg-[#282C31] px-[1.41rem] py-[0.92rem] text-sm text-white hover:bg-main lg:text-base">
                <p> 팀 소개서 바로가기</p>
                <p className="hidden rounded-full bg-black px-2 lg:flex">+</p>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
