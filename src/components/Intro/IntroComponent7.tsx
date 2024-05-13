import Image from 'next/image'
import { motion } from 'framer-motion'

export default function IntroComponent7() {
  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(180deg, #F1F3F7 19.19%, rgba(252, 252, 253, 0) 112.86%))',
      }}
      className="relative w-full  snap-start h-screen flex flex-col justify-center items-center min-h-screen bg-no-repeat bg-cover bg-white bg-opacity-50 overflow-hidden lg:py-24"
    >
      <Image
        src={'/assets/intro/mobile/section7bg.png'}
        alt="line"
        fill
        objectFit="cover"
        className="z-0 md:hidden flex"
      />

      <motion.div
        className="lg:w-[1200px] flex flex-col lg:flex-row z-50"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.9,
          ease: 'easeOut',
        }}
      >
        {/* left */}
        <div className="lg:w-1/2 lg:h-full flex items-center justify-center">
          <div className=" flex flex-col items-center lg:items-left pb-8 lg:pb-20">
            <div className="text-sm lg:text-base text-center p-1 lg:p-[0.6rem] w-[9rem] lg:w-[9.75rem] bg-grey20 rounded-lg">
              2. 간결한 매칭 서비스
            </div>
            <span className="text-[1.6rem] lg:text-[2.62rem] font-bold pt-3  lg:leading-[3.625rem] text-center lg:text-left">
              프로필만 등록하면
              <br />
              쏟아지는 추천 매칭
              <br />
            </span>
            <span className="text-xs lg:text-xl text-grey70 font-medium pt-5 text-center leading-5">
              항목에 맞게 프로필만 등록해도
              <br className="flex sm:hidden" />
              다른 사용자들이 매칭을 요청해요
            </span>
          </div>
        </div>
        {/* right */}

        <div className="w-full lg:w-[50%] lg:h-full flex flex-col gap-3 pt-2 justify-center items-center">
          <div className="sm:w-[41rem] flex flex-col gap-4 items-center ">
            <div className="hidden lg:flex justify-start w-full">
              <div className="text-lg lg:text-[1.36rem] font-bold">내가 받은 매칭</div>
            </div>

            <div className="w-[95%] sm:w-full h-[5.5rem] sm:h-[7.1rem] flex items-center sm:justify-between bg-[#fff] rounded-[0.85rem] shadow-alarm-shadow p-3 px-6">
              <Image
                src={'/assets/intro/profile3.png'}
                width={75}
                height={75}
                alt="profile"
                className="w-[3.2rem] h-[3.2rem] sm:w-[4.88rem] sm:h-[4.88rem]"
              />
              <div className="flex flex-col pl-5">
                <span className="font-semibold text-xs sm:text-[1.1rem]">Jina kim</span>
                <span className="w-full md:w-[160px] sm:w-auto text-[0.6rem] sm:text-[0.82rem]">
                  안녕하세요, AI 프로젝트 everywhere의 김진아입니다!...
                </span>

                {/* 모바일 버튼 버전 */}
                <div className="flex sm:hidden flex-row  h-full justify-end items-end gap-1 pl-5 pt-2 ">
                  <div className="cursor-pointer w-16 h-6 sm:w-24 sm:h-9 bg-[#2563EB] rounded-[0.29rem] text-[0.6rem] flex items-center justify-center text-[#fff]">
                    수락
                  </div>
                  <div className="cursor-pointer w-16 h-6 sm:w-24 sm:h-9 bg-[#7E7E7E] rounded-[0.29rem] text-[0.6rem] flex items-center justify-center text-[#fff]">
                    거절
                  </div>
                </div>
              </div>

              {/* PC 버튼 버전 */}
              <div className="hidden sm:flex flex-row h-full justify-center items-end gap-1 pl-5 sm:pl-11">
                <div className="cursor-pointer w-16 h-6 sm:w-24 sm:h-9 bg-[#2563EB] rounded-[0.29rem] text-xs flex items-center justify-center text-[#fff]">
                  수락
                </div>
                <div className="cursor-pointer w-16 h-6 sm:w-24 sm:h-9 bg-[#7E7E7E] rounded-[0.29rem] text-xs flex items-center justify-center text-[#fff]">
                  거절
                </div>
              </div>
            </div>

            <div className="w-[95%] sm:w-[33.5rem] h-[5.5rem] sm:h-[5rem] flex items-center  sm:justify-between bg-[#fff] rounded-[0.85rem] shadow-alarm-shadow p-3 px-6">
              <Image
                src={'/assets/intro/profile4.png'}
                width={60}
                height={60}
                alt="profile"
                className="rounded-full w-[3.2rem] h-[3.2rem] sm:w-[3.75rem] sm:h-[3.75rem]"
              />
              <div className="flex flex-col pl-5">
                <span className="font-semibold text-sm">최서윤</span>
                <span className="w-full md:w-[160px] sm:w-auto text-[0.6rem]">
                  저는 현재 경영학과 학사 과정에 있으며, 콘텐츠 마케팅을...{' '}
                </span>
                {/* 모바일 버튼 버전 */}
                <div className="flex sm:hidden flex-row  h-full justify-end items-end gap-1 pl-5 pt-1 ">
                  <div className="cursor-pointer w-16 h-6 sm:w-24 sm:h-9 bg-[#2563EB] rounded-[0.29rem] text-[0.6rem] flex items-center justify-center text-[#fff]">
                    수락
                  </div>
                  <div className="cursor-pointer w-16 h-6 sm:w-24 sm:h-9 bg-[#7E7E7E] rounded-[0.29rem] text-[0.6rem] flex items-center justify-center text-[#fff]">
                    거절
                  </div>
                </div>
              </div>
              {/* PC 버튼 버전 */}
              <div className="hidden sm:flex flex-row  h-full justify-center items-end gap-1 pl-5 sm:pl-11">
                <div className="cursor-pointer w-16 h-6 sm:w-24 sm:h-9 bg-[#2563EB] rounded-[0.29rem] text-xs flex items-center justify-center text-[#fff]">
                  수락
                </div>
                <div className="cursor-pointer w-16 h-6 sm:w-24 sm:h-9 bg-[#7E7E7E] rounded-[0.29rem] text-xs flex items-center justify-center text-[#fff]">
                  거절
                </div>
              </div>
            </div>

            <div className="flex justify-center sm:gap-5 sm:pr-8">
              <Image
                src={'assets/icons/blue_right_arrow.svg'}
                width={20}
                height={1}
                alt="right arrow"
                className="hidden sm:flex"
              />

              <div className="w-[95%] sm:w-[31.5rem] h-[5.5rem] sm:h-[4.69rem] backdrop-blur-[53px]  hidden sm:flex items-center bg-white-alpha-20 rounded-[0.85rem] shadow-alarm-shadow p-3 px-6">
                <Image
                  src={'/assets/intro/profile4.png'}
                  width={60}
                  height={60}
                  alt="profile"
                  className="rounded-full"
                />
                <div className="w-full flex flex-col pl-5">
                  <span className="font-semibold text-[0.7rem]">박서연님께 매칭 요청을 보냈습니다.</span>
                  <span className=" text-[0.58rem]">안녕하세요, 공모전 참여건으로 문의 드립니다... </span>
                </div>
                <div className="flex h-full items-end justify-end gap-1 pl-11">
                  <div className="cursor-pointer w-[4.4rem] h-[1.4rem] bg-[#BBBBBB78] rounded-[0.29rem] text-[0.53rem] flex items-center justify-center text-[#fff]">
                    매칭 대기중
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
