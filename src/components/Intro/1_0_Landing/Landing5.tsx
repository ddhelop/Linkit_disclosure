import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Landing5() {
  return (
    <div className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat pt-20 sm:snap-mandatory sm:snap-start sm:snap-always">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
        }}
        className="flex w-full flex-col items-center"
      >
        <p className="text-2xl font-bold">편리한 정보 확인</p>
        <h1 className="text-center text-[2.625rem] font-bold text-black">
          다른 사용자의 프로필을
          <br />
          자유롭게 열람해요
        </h1>
        <p className="pt-4 text-lg text-grey60">프로필을 열람하고 마음에 드는 사용자에게 매칭 요청을 보내 보세요</p>
      </motion.div>

      <div className="relative flex w-full justify-center">
        <Image src={'/assets/onBoarding/1.0/Landing5_img.png'} width={730} height={682} alt="landing4" />
        <div className="absolute bottom-0 left-0 h-[25rem] w-full bg-gradient-to-t from-[#F6F6F9] to-transparent"></div>
      </div>
    </div>
  )
}
