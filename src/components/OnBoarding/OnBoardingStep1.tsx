'use client'
'use client'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

export default function OnBoardingStep1() {
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
    <div className="w-full h-screen flex flex-col items-center">
      <div className="w-[838px] flex flex-col items-center py-20">
        <div className="w-full flex justify-between text-sm font-medium text-grey60 leading-9">
          <span>가이드</span>
          <span>1/3</span>
        </div>
    <div className="flex h-screen w-full flex-col items-center">
      <div className="flex w-[838px] flex-col items-center py-20">
        <div className="flex w-full justify-between text-sm font-medium leading-9 text-grey60">
          <span>가이드</span>
          <span>1/3</span>
        </div>

        <div className="w-full flex flex-col items-start leading-9">
          <span className="text-2xl font-bold">링킷에서 활동할 프로필을 선택해주세요</span>
          <span className="text-grey60">
            언제든 두 프로필 모두 만들 수 있어요. 먼저 만들 프로필 양식을 선택해주세요
          </span>
        </div>
        <div className="flex w-full flex-col items-start leading-9">
          <span className="text-2xl font-bold">링킷에서 활동할 프로필을 선택해주세요</span>
          <span className="text-grey60">
            언제든 두 프로필 모두 만들 수 있어요. 먼저 만들 프로필 양식을 선택해주세요
          </span>
        </div>

        <div className="flex flex-col items-center gap-[0.5rem] pt-16 lg:flex-row">
          {/* left box */}
          <motion.div
            className="flex h-56 w-[415px] flex-col justify-between rounded-xl border border-grey30 p-7 shadow-box-shadow3 sm:w-[418px]"
            animate={leftControls}
            onMouseEnter={handleMouseEnterLeft}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex justify-between">
              <div className="flex flex-col ">
                <span className="text-xs leading-5">내 이력서</span>
                <span className="h-20 w-44 pt-3 font-semibold leading-5">
                  뛰어난 팀 안에서 내 역량을 발휘하고 싶어요
                </span>
              </div>
              <Image
                src="/assets/icons/Default profile.svg"
                width={100}
                height={100}
                alt="profile icon"
                className="flex rounded-lg lg:hidden xl:flex"
              />
            </div>

            {/* button */}
            <div className="w-full flex justify-center">
              <Link
                href={'/onBoarding/step2/person'}
                className="flex w-44 h-11 bg-[#282C31] hover:bg-[#3c4249] rounded-full justify-center items-center gap-x-3 pl-2 cursor-pointer "
              >
                <span className="text-sm text-[#fff]">내 이력서 등록하기</span>
                <Image src="/assets/icons/addBtn.svg" width={24} height={24} alt="addButton" />
              </Link>
            </div>
          </motion.div>
            {/* button */}
            <div className="flex w-full justify-center">
              <Link
                href={'/onBoarding/step2/person'}
                className="flex h-11 w-44 cursor-pointer items-center justify-center gap-x-3 rounded-full bg-[#282C31] pl-2 hover:bg-[#3c4249] "
              >
                <span className="text-sm text-[#fff]">내 이력서 등록하기</span>
                <Image src="/assets/icons/addBtn.svg" width={24} height={24} alt="addButton" />
              </Link>
            </div>
          </motion.div>

          {/* right box */}
          <motion.div
            className="w-[415px] sm:w-[418px] h-56 border rounded-xl border-grey30 shadow-box-shadow3 flex flex-col p-7 justify-between"
            animate={rightControls}
            onMouseEnter={handleMouseEnterRight}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex justify-between">
              <div className="flex flex-col ">
                <span className="text-xs leading-5">팀 소개서</span>
                <span className="font-semibold w-48 leading-5 pt-3">
                  우리팀에 필요한 역량을 가진 멤버를 구하고 싶어요
                </span>
              </div>
              <Image
                src="/assets/icons/Team.svg"
                width={100}
                height={100}
                alt="profile icon"
                className="rounded-lg xl:flex lg:hidden flex"
              />
            </div>
          {/* right box */}
          <motion.div
            className="flex h-56 w-[415px] flex-col justify-between rounded-xl border border-grey30 p-7 shadow-box-shadow3 sm:w-[418px]"
            animate={rightControls}
            onMouseEnter={handleMouseEnterRight}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex justify-between">
              <div className="flex flex-col ">
                <span className="text-xs leading-5">팀 소개서</span>
                <span className="w-48 pt-3 font-semibold leading-5">
                  우리팀에 필요한 역량을 가진 멤버를 구하고 싶어요
                </span>
              </div>
              <Image
                src="/assets/icons/Team.svg"
                width={100}
                height={100}
                alt="profile icon"
                className="flex rounded-lg lg:hidden xl:flex"
              />
            </div>

            {/* button */}
            <div className="w-full flex justify-center">
              <Link
                href={'/onBoarding/step2/team'}
                className="flex w-44 h-11 bg-[#282C31] hover:bg-[#3c4249] rounded-full justify-center items-center gap-x-3 pl-2 cursor-pointer"
              >
                <span className="text-sm text-[#fff]">팀 소개서 등록하기</span>
                <Image src="/assets/icons/addBtn.svg" width={24} height={24} alt="addButton" />
              </Link>
            </div>
          </motion.div>
            {/* button */}
            <div className="flex w-full justify-center">
              <Link
                href={'/onBoarding/step2/team'}
                className="flex h-11 w-44 cursor-pointer items-center justify-center gap-x-3 rounded-full bg-[#282C31] pl-2 hover:bg-[#3c4249]"
              >
                <span className="text-sm text-[#fff]">팀 소개서 등록하기</span>
                <Image src="/assets/icons/addBtn.svg" width={24} height={24} alt="addButton" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  )
}
