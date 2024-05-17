'use client'

import { motion } from 'framer-motion'
import { signIn, signOut, useSession } from 'next-auth/react'

import Image from 'next/image'

export default function Login() {
  return (
    <>
      <div className="w-full h-screen flex">
        {/* left container */}
        <div className="hidden lg:flex lg:w-1/2 h-full bg-[#D3E1FE]"></div>

        {/* right container */}
        <div className="lg:w-1/2 w-full h-full py-8 flex flex-col items-center justify-center">
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
            <div className="flex w-[23rem] h-[3.5rem] px-24 bg-[#00C73C] rounded items-center gap-1 cursor-pointer">
              <Image src={'/assets/login/naverLogo.png'} width={39} height={44} alt="naverLogin" />
              <span className="font-semibold text-[#fff]">네이버로 시작하기</span>
            </div>

            <div
              className="flex w-[23rem] h-[3.5rem] px-24 bg-[#FFE500] rounded items-center gap-1 cursor-pointer"
              onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/onBoarding' })}
            >
              <Image src={'/assets/login/kakaoLogo.svg'} width={39} height={56} alt="kakaoLogin" />
              <span className="font-semibold">카카오로 시작하기</span>
            </div>

            <div
              className="flex w-[23rem] h-[3.5rem] px-[6.5rem] items-cente gap-3 items-center border-[1px] border-grey30 rounded cursor-pointer"
              onClick={() => signOut()}
            >
              <Image src={'/assets/login/googleLogo.svg'} width={23} height={23} alt="NaverLogin" />
              <span className="font-semibold">구글로 시작하기</span>
            </div>
          </div>

          <div className="w-full flex justify-center pt-28">
            <span className="w-full text-xs text-grey60 font-normal text-center">
              회원가입시 linkit의 서비스 이용약관과 개인정보 보호정책에 동의하게됩니다.
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
