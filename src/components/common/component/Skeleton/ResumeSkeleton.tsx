'use client'
import { motion, Variants } from 'framer-motion'

export default function ResumeSkeleton() {
  // Define animation variants
  const shimmerVariants: Variants = {
    initial: {
      opacity: 0.5,
    },
    animate: {
      opacity: [0.7, 1, 0.7], // Opacity will cycle from 0.5 to 1 to 0.5
      transition: {
        duration: 2.5, // Duration of the animation cycle
        repeat: Infinity, // Repeat infinitely
        ease: 'easeInOut', // Easing function for smooth transitions
      },
    },
  }

  return (
    <div className="flex flex-col pb-[70px] pt-[61px]">
      {/* Header */}
      <motion.div
        className="fixed z-10 flex h-[4rem] w-full items-center gap-[3.17rem] bg-white-alpha-50 px-[9.72rem] backdrop-blur-2xl"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      >
        <span className="cursor-pointer border-b-4 border-[#2563EB] py-4 text-main hover:text-main">내 이력서</span>

        <span className="text-grey300 cursor-pointer opacity-50 hover:text-main">팀 소개서</span>
      </motion.div>
      {/* contents */}
      <div className="flex justify-center  gap-[3.2rem] pt-[101px]">
        {/* left navBar */}
        <motion.div
          className="w-[21.25rem] rounded-[0.75rem]"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="flex w-[23rem] flex-col bg-white p-5">
            <div className="h-[1.1rem] w-[16rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[0.56rem] h-[1.1rem] w-[7rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[4.88rem] flex gap-2">
              <div className="h-[1.7rem] w-[5.9rem] rounded-lg bg-[#D3E1FE33]"></div>
              <div className="h-[1.7rem] w-[5.9rem] rounded-lg bg-[#D3E1FE33]"></div>
            </div>
            <div className="mt-[0.94rem] flex justify-between">
              <div className="flex">
                <div className="h-[3.1rem] w-[3.1rem] rounded-full bg-grey30"></div>
                <div className="ml-4 flex flex-col justify-end gap-2">
                  <div className="h-[1rem] w-[4rem] rounded-3xl bg-grey30"></div>
                  <div className="h-[1rem] w-[8rem] rounded-3xl bg-grey30"></div>
                </div>
              </div>

              <div className="h-[2.8rem] w-[5.6rem] rounded-[0.3rem] bg-grey30"></div>
            </div>
          </div>
        </motion.div>

        {/* right contents */}
        <motion.div
          className="flex w-[47.31rem] flex-col gap-[1.06rem]"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="w-full rounded-2xl bg-white px-[2.12rem] pb-[7.44rem] pt-[1.44rem]">
            <div className="h-[1.1rem] w-[18rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[2rem] h-[0.8rem] w-[3.8rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[0.69rem] h-[0.8rem] w-[7.8rem] rounded-[2.5rem] bg-grey30"></div>
          </div>

          <div className="w-full rounded-2xl bg-white px-[2.12rem] pb-[1.44rem] pt-[1.44rem]">
            <div className="h-[1.1rem] w-[18rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[1rem] h-[2.5rem] w-[5.5rem] rounded-[0.31rem] border border-grey40 bg-white"></div>

            <div className="mt-[1.5rem] h-[1.1rem] w-[18rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="flex gap-2">
              <div className="mt-[1rem] h-[2.5rem] w-[5.5rem] rounded-[0.31rem] border border-grey40 bg-white"></div>
              <div className="mt-[1rem] h-[2.5rem] w-[5.5rem] rounded-[0.31rem] border border-grey40 bg-white"></div>
            </div>
          </div>

          <div className="w-full rounded-2xl bg-white px-[2.12rem] pb-[1.44rem] pt-[1.44rem]">
            <div className="h-[1.1rem] w-[18rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="flex gap-2">
              <div className="mt-[1rem] h-[2.5rem] w-[5.5rem] rounded-[0.31rem] border border-grey40 bg-white"></div>
              <div className="mt-[1rem] h-[2.5rem] w-[5.5rem] rounded-[0.31rem] border border-grey40 bg-white"></div>
            </div>
          </div>

          <div className="w-full rounded-2xl bg-white px-[2.12rem] pb-[7.44rem] pt-[1.44rem]">
            <div className="h-[1.1rem] w-[18rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[2rem] h-[0.8rem] w-[3.8rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[0.69rem] h-[0.8rem] w-[7.8rem] rounded-[2.5rem] bg-grey30"></div>
          </div>

          <div className="w-full rounded-2xl bg-white px-[2.12rem] pb-[7.44rem] pt-[1.44rem]">
            <div className="h-[1.1rem] w-[18rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[2rem] h-[0.8rem] w-[3.8rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[0.69rem] h-[0.8rem] w-[7.8rem] rounded-[2.5rem] bg-grey30"></div>
          </div>

          <div className="w-full rounded-2xl bg-white px-[2.12rem] pb-[7.44rem] pt-[1.44rem]">
            <div className="h-[1.1rem] w-[18rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[2rem] h-[0.8rem] w-[3.8rem] rounded-[2.5rem] bg-grey30"></div>
            <div className="mt-[0.69rem] h-[0.8rem] w-[7.8rem] rounded-[2.5rem] bg-grey30"></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
