'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
type PositionKey = '개발자' | '디자이너' | '마케터' | '기획자' | '리서처' | '비즈니스'

export default function IntroComponentTemp() {
  const [selectedRole, setSelectedRole] = useState<PositionKey>('개발자')

  const positions: Record<PositionKey, { text: string; image: string; bgImage: string }> = {
    개발자: {
      text: '개발자 포지션',
      image: '/assets/intro/developer.png',
      bgImage: '/assets/intro/developerbg.png',
    },
    디자이너: {
      text: '디자이너 포지션',
      image: '/assets/intro/designer.png',
      bgImage: '/assets/intro/designerbg.png',
    },
    마케터: {
      text: '마케터 포지션',
      image: '/assets/intro/marketer.png',
      bgImage: '/assets/intro/marketerbg.png',
    },
    기획자: {
      text: '기획자 포지션',
      image: '/assets/intro/planner.png',
      bgImage: '/assets/intro/plannerbg.png',
    },
    리서처: {
      text: '리서처 포지션',
      image: '/assets/intro/researcher.png',
      bgImage: '/assets/intro/researcherbg.png',
    },
    비즈니스: {
      text: '비즈니스 포지션',
      image: '/assets/intro/business.png',
      bgImage: '/assets/intro/businessbg.png',
    },
  }

  return (
    <>
      <div
        className="w-full relative snap-start h-screen flex flex-col items-center justify-center min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-opacity-50 overflow-hidden"
        // style={{ backgroundImage: `url("${positions[selectedRole].bgImage}")` }}
      >
        <Image src={positions[selectedRole].bgImage} alt="line" fill objectFit="cover" className="z-0" />
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="z-50 shadow-frame-shaow rounded-[3.125rem] bg-[rgba(79, 81, 98, 0.07)] backdrop-blur-2xl"
        >
          <div className="w-[31.6rem] h-[21.9rem] py-[1.65rem] flex flex-col items-center z-50">
            <div className="flex gap-4 font-medium backdrop-blur-[37px]">
              <span className="">성공을</span>
              <Image src={'/assets/intro/lineLink.svg'} alt="line" width={89} height={1} />
              <span className="">잇는 팀빌딩</span>
            </div>

            <div className="flex w-[22.4rem] justify-between pt-10">
              <Image
                src={positions[selectedRole].image}
                width={124}
                height={124}
                alt=""
                className="rounded-[1.875rem]"
              />
              <div className="flex flex-col text-left justify-center">
                <span className="font-medium ">7월 팀빌딩을 위한</span>
                <span className="font-bold text-[2rem]">{positions[selectedRole].text}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-8 cursor-pointer justify-center w-[14.25rem] h-[4.4rem] bg-[#2F353C] rounded-[3.75rem]">
              <span className="text-lg text-[#fff]">사전 신청하러 가기</span>
              <Image src={'/assets/icons/right_arrow.svg'} width={17} height={1} alt="right_arrow" />
            </div>
          </div>
        </motion.div>
        <div className="flex justify-between mt-7 shadow-gray-07 items-center px-7 z-50 w-[39.5rem] h-[3.68rem] bg-[rgba(79, 81, 98, 0.07)] rounded-[3.91rem] backdrop-blur-2xl">
          {Object.keys(positions).map((role) => (
            <span
              key={role}
              className={`cursor-pointer ${selectedRole === role ? 'text-xl font-bold grey100' : 'text-base font-medium text-grey70'}`}
              onClick={() => setSelectedRole(role as PositionKey)}
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
