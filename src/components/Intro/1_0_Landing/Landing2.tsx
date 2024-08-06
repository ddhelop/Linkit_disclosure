import Image from 'next/image'
import { motion } from 'framer-motion'
import { slideUpAnimation } from '@/lib/animations'

export default function Landing2() {
  return (
    <div
      style={{ backgroundImage: 'url("/assets/onBoarding/1.0/Landing2_bg.png")' }}
      className="relative flex h-screen min-h-screen w-full flex-col items-center justify-center overflow-hidden overflow-x-auto bg-[#F0F2F6] bg-opacity-50 bg-cover bg-no-repeat px-4 sm:snap-mandatory sm:snap-start sm:snap-always lg:px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
        }}
      >
        <h1 className="text-center text-[1rem] font-bold text-black sm:text-[1.5rem]">직관적인 프로필을 통해</h1>
        <p className="text-[1.8rem] font-bold text-black sm:text-[2.625rem]">서로가 원하는 핏을 찾을 수 있어요</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
        }}
        className="mt-[2rem] flex w-full justify-center gap-[2.2rem] sm:mt-[4.75rem]"
      >
        <div className="hidden w-[25.8rem] flex-col gap-[0.89rem] lg:flex">
          {/* 프로필 */}
          <div className="flex w-full flex-col rounded-[0.75rem] border border-grey30 bg-white px-[1.56rem] py-[1.75rem]">
            <p className="text-xl font-bold">
              스타트업 출신의
              <br />
              비즈니스 중심 UX 디자이너 입니다
            </p>
            <div className="flex gap-[0.29rem] pt-[0.84rem]">
              <div className="rounded-[0.5rem] bg-grey10 px-[0.65rem] py-1 text-grey60">스타트업 디자인 리드</div>
              <div className="rounded-[0.5rem] bg-grey10 px-[0.65rem] py-1 text-grey60">레드닷 수상</div>
            </div>

            <div className="mt-[2.16rem] flex gap-[0.56rem]">
              <Image
                src="/assets/onBoarding/1.0/Landing2_profile_Suki.png"
                width={50}
                height={50}
                alt="profile"
                className="rounded-full"
              />

              <div className="flex flex-col justify-center">
                <p className="text-[0.84rem] font-semibold text-grey70">Sukki</p>
                <p className="text-[0.84rem] text-grey60">UX Design</p>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center rounded-[0.75rem] border border-grey30 bg-white px-[1.19rem] py-5 text-center text-lg">
            “제가 디자인한 프로덕트를 출시하여
            <br />
            수익화를 이루어내고 싶어요 ”
          </div>
        </div>

        <div className="hidden flex-col items-center justify-between py-[3rem] lg:flex">
          <Image src={'/assets/onBoarding/1.0/Landing2_left_pointer.svg'} width={126} height={1} alt="pointer" />
          <Image src={'/assets/onBoarding/1.0/Landing2_loading.png'} width={72} height={72} alt="pointer" />
          <Image src={'/assets/onBoarding/1.0/Landing2_right_pointer.svg'} width={126} height={1} alt="pointer" />
        </div>

        <div className="flex flex-col gap-[0.89rem] sm:w-[25.8rem]">
          {/* 프로필 */}
          <div className="flex w-full flex-col rounded-[0.75rem] border border-grey30 bg-white px-[1.56rem] py-[1.75rem]">
            <p className="text-base font-bold sm:text-xl">
              사람을 가장 중요하게 생각하는 개발자 출신
              <br /> 창업가입니다
            </p>
            <div className="flex gap-[0.29rem] pt-[0.84rem] text-xs sm:text-base">
              <div className="rounded-[0.5rem] bg-grey10 px-[0.65rem] py-1 text-grey60">빠른 소통 가능</div>
              <div className="rounded-[0.5rem] bg-grey10 px-[0.65rem] py-1 text-grey60">프로젝트 경험 다수</div>
              <div className="rounded-[0.5rem] bg-grey10 px-[0.65rem] py-1 text-grey60">예비창업</div>
            </div>

            <div className="mt-[2.16rem] flex gap-[0.56rem]">
              <Image
                src="/assets/onBoarding/1.0/Landing2_profile_dh.png"
                width={50}
                height={50}
                alt="profile"
                className="rounded-full"
              />

              <div className="flex flex-col justify-center">
                <p className="text-xs font-semibold text-grey70 sm:text-[0.84rem]">권동진</p>
                <p className="text-xs text-grey60 sm:text-[0.84rem]">Business</p>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-center rounded-[0.75rem] border border-grey30 bg-white px-[1.19rem] py-5 text-center text-sm sm:text-lg">
            “실무 경험을 가진 디자이너와 소통하며 <br />
            창업의 시작을 함께 하고 싶어요”
          </div>
        </div>
      </motion.div>
    </div>
  )
}
