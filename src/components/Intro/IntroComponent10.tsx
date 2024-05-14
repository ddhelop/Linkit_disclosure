import Image from 'next/image'
import { motion } from 'framer-motion'

export default function IntroComponent10() {
  const burstAnimation = {
    initial: {
      scale: 0.9,
      opacity: 0.6,
    },
    animate: {
      scale: 1.8,
      opacity: [0.3, 1, 0.6],
      transition: {
        duration: 3,
        ease: 'easeInOut',
        loop: Infinity,
      },
    },
  }

  return (
    <motion.div
      className="relative w-full snap-start h-screen  flex flex-col items-center pt-20 lg:pt-32 min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        duration: 0.9,
        ease: 'easeOut',
      }}
    >
      <motion.div variants={burstAnimation} initial="initial" whileInView="animate" className="absolute inset-0">
        <Image src={'/assets/intro/section10bg.png'} alt="line" layout="fill" objectFit="cover" />
      </motion.div>

      <Image
        src={'/assets/intro/linkitRec.png'}
        width={921}
        height={921}
        alt="linkit"
        className="absolute bottom-0 left-20 right-0 mx-auto hidden lg:flex"
      />

      <div className="w-full flex flex-col items-center z-10">
        <span className="text-[1.6rem] lg:text-[2.62rem] font-bold pt-3 lg:leading-[3.625rem] text-center">
          링킷이
          <br />
          다시 돌아왔습니다
        </span>
        <span className="text-xs lg:text-xl text-grey70 font-medium pt-3 lg:pt-5 text-center leading-8">
          베타서비스 이후 더욱 발전된 링킷의 팀빌딩 서비스를 만나보세요!
        </span>
      </div>

      <div className="flex lg:flex-row flex-col items-center gap-5 w-full justify-end overflow-x-hidden lg:ml-[30rem] pt-12 lg:pt-28 z-10">
        <div className="flex flex-col  w-[21.8rem] lg:w-[32rem] h-[5.5rem] justify-center bg-white-alpha-50 rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-sm lg:text-lg">좋은 팀원 만나서 데이터 분석 공모전에서 수상했습니다!</span>
          <span className="w-full text-center lg:text-right pt-2 text-xs lg:text-sm">취업준비생 최00님</span>
        </div>

        <div className="flex flex-col w-[21.8rem] lg:w-[32rem] h-[5.5rem] justify-center bg-white-alpha-50 rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-sm lg:text-lg">덕분에 창업팀 초기 멤버를 구했어요. 정말 감사합니다</span>
          <span className="w-full text-center lg:text-right pt-2 text-xs lg:text-sm">예비 창업가 김00님</span>
        </div>

        <div className="flex flex-col w-[21.8rem] lg:w-[32rem] h-[5.5rem] justify-center bg-white-alpha-50 rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-sm lg:text-lg">팀에 필요한 개발 인력을 구했습니다.</span>
          <span className="w-full text-center lg:text-right pt-2 text-xs lg:text-sm">스타트업 대표 배00님</span>
        </div>
      </div>

      <div className="hidden lg:flex gap-5 w-full justify-start overflow-x-hidden mr-[30rem] pt-16 z-10">
        <div className="flex flex-col w-[37.9rem] h-[5.5rem] bg-white-alpha-50 rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-lg">좋은 팀원 만나서 데이터 분석 공모전에서 수상했습니다!</span>
          <span className="w-full text-right pt-2 text-sm">취업준비생 최00님</span>
        </div>

        <div className="flex flex-col w-[37.9rem] h-[5.5rem] bg-white-alpha-50] rounded-lg px-10 py-4 shadow-rec-shadow">
          <span className="text-lg">덕분에 창업팀 초기 멤버를 구했어요. 정말 감사합니다</span>
          <span className="w-full text-right pt-2 text-sm">예비 창업가 김00님</span>
        </div>
      </div>
    </motion.div>
  )
}
