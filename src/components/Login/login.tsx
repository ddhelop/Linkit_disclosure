'use client'

import { motion } from 'framer-motion'

import Image from 'next/image'

export default function Login() {
  return (
    <>
      <div className="flex h-screen w-full">
        {/* left container */}
        <div className="hidden h-full bg-[#D3E1FE] lg:flex lg:w-1/2"></div>

        {/* right container */}
        <div className="flex h-full w-full flex-col items-center justify-center py-8 lg:w-1/2">
          <div className="flex flex-col items-center pt-44">
            <p className="text-lg font-medium">팀빌딩의 시작 링킷</p>
            <Image src={'/assets/icons/headerLogo.svg'} width={241} height={46} alt="linkit_login" className="pt-6" />

            <motion.div
              animate={{ y: ['0px', '10px', '0px'] }}
              transition={{ repeat: Infinity, repeatType: 'loop', duration: 2.5, ease: 'easeInOut' }}
            >
              <Image src={'/assets/icons/quickStart.svg'} width={126} height={50} alt="quickStart" className="pt-20" />
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-2 pt-6">
            <div className="flex h-[3.5rem] w-[23rem] cursor-pointer items-center gap-1 rounded bg-[#00C73C] px-24">
              <Image src={'/assets/login/naverLogo.png'} width={39} height={44} alt="naverLogin" />
              <span className="font-semibold text-[#fff]">네이버로 시작하기</span>
            </div>

            <div className="flex h-[3.5rem] w-[23rem] cursor-pointer items-center gap-1 rounded bg-[#FFE500] px-24">
              <Image src={'/assets/login/kakaoLogo.svg'} width={39} height={56} alt="kakaoLogin" />
              <span className="font-semibold">카카오로 시작하기</span>
            </div>

            <div className="items-cente flex h-[3.5rem] w-[23rem] cursor-pointer items-center gap-3 rounded border-[1px] border-grey30 px-[6.5rem]">
              <Image src={'/assets/login/googleLogo.svg'} width={23} height={23} alt="NaverLogin" />
              <span className="font-semibold">구글로 시작하기</span>
            </div>
          </div>

          <div className="flex w-full justify-center pt-28">
            <span className="w-full text-center text-xs font-normal text-grey60">
              회원가입시 linkit의 서비스 이용약관과 개인정보 보호정책에 동의하게됩니다.
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
