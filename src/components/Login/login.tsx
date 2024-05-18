'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Login() {
  const [kakaoURL, setKakaoURL] = useState('')
  const [googleURL, setGoogleURL] = useState('')
  const [naverURL, setNaverURL] = useState('')

  useEffect(() => {
    const protocol = window.location.protocol
    const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY
    const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_REST_API_KEY
    const naverApiKey = process.env.NEXT_PUBLIC_NAVER_REST_API_KEY

    const kakaoRedirectUri = `${protocol}//localhost:3000/login/oauth2/callback/kakao`
    const googleRedirectUri = `${protocol}//localhost:3000/login/oauth2/callback/google`
    const naverRedirectUri = `${protocol}//localhost:3000/login/oauth2/callback/naver`

    const kakaoOAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${kakaoRedirectUri}&response_type=code`
    const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleApiKey}&redirect_uri=${googleRedirectUri}&response_type=code&scope=email profile`
    const naverOAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverApiKey}&redirect_uri=${naverRedirectUri}&state=test`

    setKakaoURL(kakaoOAuthURL)
    setGoogleURL(googleOAuthURL)
    setNaverURL(naverOAuthURL)
  }, [])

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL
  }

  const handleGoogleLogin = () => {
    window.location.href = googleURL
  }

  const handleNaverLogin = () => {
    window.location.href = naverURL
  }

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
            <div
              className="flex h-[3.5rem] w-[23rem] cursor-pointer items-center gap-1 rounded bg-[#00C73C] px-24"
              onClick={handleNaverLogin}
            >
              <Image src={'/assets/login/naverLogo.png'} width={39} height={44} alt="naverLogin" />
              <span className="font-semibold text-[#fff]">네이버로 시작하기</span>
            </div>

            <div
              className="flex h-[3.5rem] w-[23rem] cursor-pointer items-center gap-1 rounded bg-[#FFE500] px-24"
              onClick={handleKakaoLogin}
            >
              <Image src={'/assets/login/kakaoLogo.svg'} width={39} height={56} alt="kakaoLogin" />
              <span className="font-semibold">카카오로 시작하기</span>
            </div>

            <div
              className="items-cente flex h-[3.5rem] w-[23rem] cursor-pointer items-center gap-3 rounded border-[1px] border-grey30 px-[6.5rem]"
              onClick={handleGoogleLogin}
            >
              <Image src={'/assets/login/googleLogo.svg'} width={23} height={23} alt="GoogleLogin" />
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
