'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {
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
      <div className="flex h-full w-1/2 bg-[#D3E1FE] "></div>

      {/* right container */}
      <div className="flex h-full w-1/2 flex-col items-center justify-center pb-20">
        <div className=" flex flex-col gap-2 text-center font-normal">
          <span className="text-xl text-grey70">성공적인 팀빌딩,</span>
          <span className="flex text-2xl font-normal text-grey90">
            <p className="font-bold">링킷</p>에서 시작하세요
          </span>
        </div>

        <Image src="/features/auth/bubble_guide.svg" width={234} height={45} alt="logo" className="mt-[2.94rem]" />

        <div className="mt-[1.62rem] flex flex-col gap-3">
          {/* naver */}
          <Link
            href={NAVER_AUTH_URL}
            className="flex w-[23.11rem] items-center justify-center gap-3 rounded-[0.39rem] bg-[#00C73C] py-3 hover:opacity-80"
          >
            <Image src="/features/auth/naver_logo.svg" width={16} height={16} alt="kakao" />
            <p className="text-sm text-white">네이버로 시작하기</p>
          </Link>

          {/* kakao */}
          <Link
            href={KAKAO_AUTH_URL}
            className="flex w-[23.11rem] items-center justify-center gap-3 rounded-[0.39rem] bg-[#FFE500] py-3 hover:opacity-80"
          >
            <Image src="/features/auth/kakao_logo.svg" width={20} height={20} alt="kakao" />
            <p className="text-sm text-grey100">카카오로 시작하기</p>
          </Link>

          {/* google */}
          <Link
            href={GOOGLE_AUTH_URL}
            className="flex w-[23.11rem] items-center justify-center gap-3 rounded-[0.39rem] border border-grey30 py-3 pr-2 hover:bg-grey10"
          >
            <Image src="/features/auth/google_logo.svg" width={20} height={20} alt="kakao" />
            <p className="text-sm text-grey100">구글로 시작하기</p>
          </Link>
        </div>

        <p className="mt-[3.87rem] flex text-xs font-normal text-grey60">
          회원가입 시 Linkit의{' '}
          <Link href={'/'} className="cursor-pointer px-1 underline hover:brightness-150">
            서비스 이용약관
          </Link>
          과{' '}
          <Link href={'/'} className="cursor-pointer px-1 underline hover:brightness-150">
            개인정보 보호정책
          </Link>
          에 동의하게 됩니다
        </p>
      </div>
    </div>
  )
}
