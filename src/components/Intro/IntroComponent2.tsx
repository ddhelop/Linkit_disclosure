import Image from 'next/image'
import { motion } from 'framer-motion'

export default function IntroComponent2() {
  return (
    <>
      <div className="w-full bg-[#F0F2F6] relative snap-start h-screen flex flex-col items-center min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden">
        <div className="w-full h-[80%] pt-20 lg:pt-28 flex flex-col lg:justify-center items-center lg:pl-[11rem]  bg-[#fff]">
          <div className="w-full lg:w-[1200px] flex flex-col md:flex-row items-center lg:items-start lg:relative">
            <motion.div
              className="md:w-1/2 flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.9,
                ease: 'easeOut',
              }}
            >
              <span className="text-[1.6rem] lg:text-[2.625rem] font-bold text-center lg:text-left lg:mt-24 lg:leading-[3.4rem]">
                자유로운
                <br />
                자기 PR의 공간
              </span>
              <span className="text-sm lg:text-[1.25rem] font-medium text-grey70 pt-3 lg:pt-8 md:leading-6 lg:leading-8 text-center lg:text-left">
                링킷에서 자유롭게 나를 홍보하세요,
                <br />
                공모전, 대회, 프로젝트, 창업팀까지
                <br />
                다양한 팀빌딩이 가능해요.
              </span>
            </motion.div>

            <motion.div
              className="md:w-1/2 "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.9,
                ease: 'easeOut',
              }}
            >
              <Image
                src={'/assets/intro/section2Profile.png'}
                width={570}
                height={504}
                alt="이력서"
                className="w-[430px] md:w-auto md:h-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
