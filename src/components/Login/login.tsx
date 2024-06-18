'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {
  // kakao_login
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
  const KAKAO_REDIRECT_URI = 'http://localhost:3000/login/oauth2/callback/kakao'
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

  // naver_login
  const NAVER_REST_API_KEY = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const NAVER_REDIRECT_URI = 'http://localhost:3000/login/oauth2/callback/naver'
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&redirect_uri=${NAVER_REDIRECT_URI}&state=test`

  // google_login
  const GOOGLE_REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const GOOGLE_REDIRECT_URI = 'http://localhost:3000/login/oauth2/callback/google'
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`

  https: return (
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
            {/* <Link href="#"> */}
            <Link href={NAVER_AUTH_URL}>
              <div className="flex h-[3.5rem] w-[23rem] cursor-pointer items-center gap-1 rounded bg-[#00C73C] px-24">
                <Image src={'/assets/login/naverLogo.png'} width={39} height={44} alt="naverLogin" />
                <span className="font-semibold text-[#fff]">네이버로 시작하기</span>
              </div>
            </Link>

            <Link href={KAKAO_AUTH_URL}>
              <div className="flex h-[3.5rem] w-[23rem] cursor-pointer items-center gap-1 rounded bg-[#FFE500] px-24">
                <Image src={'/assets/login/kakaoLogo.svg'} width={39} height={56} alt="kakaoLogin" />
                <span className="font-semibold">카카오로 시작하기</span>
              </div>
            </Link>

            <Link href={GOOGLE_AUTH_URL}>
              <div className="items-cente flex h-[3.5rem] w-[23rem] cursor-pointer items-center gap-3 rounded border-[1px] border-grey30 px-[6.5rem]">
                <Image src={'/assets/login/googleLogo.svg'} width={23} height={23} alt="GoogleLogin" />
                <span className="font-semibold">구글로 시작하기</span>
              </div>
            </Link>
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
