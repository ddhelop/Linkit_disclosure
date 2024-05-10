'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function IntroComponent3() {
  return (
    <div
      style={{ backgroundImage: 'url("/assets/intro/section3bg.jpg")' }}
      className="w-full snap-start h-screen flex items-center  min-h-[540px] md:min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden"
    >
      <div className="w-[50%] h-full flex items-center justify-center"></div>

      <div className="w-[50%] h-full flex items-center justify-center">
        <div className="flex  flex-col items-end justify-center ">
          <span className="text-[2.62rem] font-bold pb-4 text-grey100">목표를 향해 모이세요</span>

          <span className="text-[1.25rem] font-medium text-grey70 pt-5 text-right">
            같은 목표를 가진 사람들과 모이세요.
            <br />
            원하는 프로젝트에 따라, <br />
            실패없는 팀빌딩을 이루어드립니다.
            <br />
          </span>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-[17.18rem] h-[4.43rem] gap-4 mt-12 flex justify-center items-center bg-[#2F353C] text-[#fff] rounded-[3.75rem] cursor-pointer"
          >
            <span className="font-medium ml-4">7월에 진행하는 프로젝트 찾기</span>
            <Image src={'/assets/icons/right_arrow.svg'} width={17} height={1} alt="right arrow" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
