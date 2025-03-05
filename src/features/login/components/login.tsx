'use client'
import { useRecentLoginStore } from '@/shared/store/useRecentLoginStore'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import RecentLogin from './RecentLogin'

export default function Login() {
  const { platform } = useRecentLoginStore()

  // kakao_login
  const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
  const KAKAO_REDIRECT_URI = `${process.env.NEXT_PUBLIC_LINKIT_REDIRECT_URL}/login/oauth2/callback/kakao`
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

  // naver_login
  const NAVER_REST_API_KEY = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const NAVER_REDIRECT_URI = `${process.env.NEXT_PUBLIC_LINKIT_REDIRECT_URL}/login/oauth2/callback/naver`
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_REST_API_KEY}&redirect_uri=${NAVER_REDIRECT_URI}&state=test`

  // google_login
  const GOOGLE_REST_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const GOOGLE_REDIRECT_URI = `${process.env.NEXT_PUBLIC_LINKIT_REDIRECT_URL}/login/oauth2/callback/google`
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`

  return (
    <div className="flex h-screen w-full bg-white">
      {/* left container */}
      <div className="hidden h-full w-1/2 bg-[#EDF3FF] lg:flex ">
        <Image src="/features/auth/login_illustration.svg" width={750} height={750} alt="banner" className="m-auto" />
      </div>

      {/* right container */}
      <div className="flex h-full w-full flex-col items-center justify-center pb-20 lg:w-1/2">
        <div className=" flex flex-col gap-2 text-center font-normal">
          <span className="text-xl text-grey70">성공적인 팀빌딩,</span>
          <span className="flex text-2xl font-normal text-grey90">
            <p className="font-bold">링킷</p>에서 시작하세요
          </span>
        </div>

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image src="/features/auth/bubble_guide.svg" width={234} height={45} alt="logo" className="mt-[2.94rem]" />
        </motion.div>

        <div className="mt-[1.62rem] flex w-full flex-col items-center gap-3">
          {/* naver */}
          <div className="relative w-[90%] sm:w-[23.11rem]">
            {platform == 'naver' && <RecentLogin />}
            <Link
              href={NAVER_AUTH_URL}
              className="flex w-full items-center justify-center gap-3 rounded-[0.39rem] bg-[#00C73C] py-3 hover:opacity-80"
            >
              <Image src="/features/auth/naver_logo.svg" width={16} height={16} alt="kakao" />
              <p className="text-sm text-white">네이버로 시작하기</p>
            </Link>
          </div>

          {/* kakao */}
          <div className="relative w-[90%] sm:w-[23.11rem]">
            {platform == 'kakao' && <RecentLogin />}
            <Link
              href={KAKAO_AUTH_URL}
              className="flex w-full items-center justify-center gap-3 rounded-[0.39rem] bg-[#FFE500] py-3 hover:opacity-80"
            >
              <Image src="/features/auth/kakao_logo.svg" width={20} height={20} alt="kakao" />
              <p className="text-sm text-grey100">카카오로 시작하기</p>
            </Link>
          </div>

          {/* google */}
          <div className="relative w-[90%] sm:w-[23.11rem]">
            {platform == 'google' && <RecentLogin />}
            <Link
              href={GOOGLE_AUTH_URL}
              className="flex w-full items-center justify-center gap-3 rounded-[0.39rem] border border-grey30 py-3 pr-2 hover:bg-grey10"
            >
              <Image src="/features/auth/google_logo.svg" width={20} height={20} alt="kakao" />
              <p className="text-sm text-grey100">구글로 시작하기</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
