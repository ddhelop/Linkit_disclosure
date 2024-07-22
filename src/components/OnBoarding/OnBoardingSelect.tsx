'use client'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import OnBoardingHeader from './OnBoardingHeader'

export default function OnBoardingSelect() {
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
    <div className="flex w-full flex-col items-center  lg:pt-[69px]">
      <OnBoardingHeader percentage={33} />
      <div className="flex w-[90%]  flex-col items-center py-20 lg:w-[838px]">
        <div className="flex w-full justify-between text-xs font-medium leading-9 text-grey60 lg:text-sm">
          <span>가이드</span>
          <span>1/3</span>
        </div>

        <div className="flex w-full flex-col items-start leading-9">
          <span className="text-xl font-bold lg:text-2xl">링킷에서 활동할 프로필을 선택해주세요</span>
          <span className="pt-1 text-sm text-grey60 lg:text-base">
            언제든 두 프로필 모두 만들 수 있어요. 먼저 만들 프로필 양식을 선택해주세요
          </span>
        </div>

        <div className="flex flex-col items-center gap-[0.5rem] pt-3 md:pt-8 lg:flex-row lg:pt-16">
          {/* left box */}
          <motion.div
            className="flex h-56 flex-col justify-between rounded-xl border border-grey30 p-7 shadow-box-shadow3 md:w-[415px]"
            animate={leftControls}
            onMouseEnter={handleMouseEnterLeft}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex justify-between">
              <div className="flex flex-col ">
                <span className="text-[2rem] font-bold leading-5">👋</span>
                <span className="pt-4 text-2xl font-bold ">내 이력서 등록하기</span>
                <span className=" pt-3 leading-5 text-grey60">뛰어난 팀 안에서 내 역량을 발휘하고 싶어요</span>
              </div>
            </div>

            {/* button */}
            <div className="flex w-full justify-end">
              <Link
                href={'/onBoarding/person/project'}
                className="flex h-11 w-44 cursor-pointer items-center justify-center gap-x-3 rounded-[0.31rem] bg-[#282C31] pl-2 hover:bg-[#3c4249] "
              >
                <span className="text-sm text-[#fff]">내 이력서 등록하기</span>
                <Image src="/assets/icons/addBtn.svg" width={24} height={24} alt="addButton" />
              </Link>
            </div>
          </motion.div>

          {/* right box */}
          <motion.div
            className="flex h-56 flex-col justify-between rounded-xl border border-grey30 p-7 shadow-box-shadow3 md:w-[415px]"
            animate={rightControls}
            onMouseEnter={handleMouseEnterRight}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex justify-between">
              <div className="flex flex-col ">
                <span className="text-[2rem] font-bold leading-5">🚀</span>
                <span className="pt-4 text-2xl font-bold ">팀 소개서 등록하기</span>
                <span className=" pt-3 leading-5 text-grey60">우리 팀에 필요한 역량을 가진 멤버를 구하고 싶어요</span>
              </div>
            </div>

            {/* button */}
            <div className="flex w-full justify-end">
              <Link
                href={'/onBoarding/team/teamCategory'}
                className="flex h-11 w-44 cursor-pointer items-center justify-center gap-x-3 rounded-[0.31rem] bg-[#282C31] pl-2 hover:bg-[#3c4249] "
              >
                <span className="text-sm text-[#fff]">팀 소개서 등록하기</span>
                <Image src="/assets/icons/addBtn.svg" width={24} height={24} alt="addButton" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
