import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Landing6() {
  return (
    <div className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat px-4 pt-20 sm:snap-mandatory sm:snap-start sm:snap-always sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
        }}
        className="flex w-full flex-col items-center"
      >
        <p className="text-base font-bold sm:text-2xl">체계적인 매칭 시스템</p>
        <h1 className="text-center text-[1.7rem] font-bold text-black sm:text-[2.625rem]">
          함께 팀을 이루고싶은 사람에게 <br />
          매칭 요청을 보내요
        </h1>
        <p className="pt-4 text-sm text-grey60 sm:text-lg">
          매칭 요청을 보낼 시 본인을 어필하는 메시지를 함께 전달할 수 있어요
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
        }}
      >
        <Image
          src={'/assets/onBoarding/1.0/Landing6_img.png'}
          width={950}
          height={461}
          alt="landing4"
          className="mt-[1.5rem]"
        />
      </motion.div>
    </div>
  )
}
