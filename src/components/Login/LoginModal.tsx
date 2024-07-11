// components/LoginModal.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
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

  if (!isOpen) return null

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000] bg-opacity-40"
      onClick={handleBackgroundClick}
    >
      <motion.div
        initial={{ y: '5vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100vh', opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-lg bg-[#fff] px-[4.25rem] pb-[2.31rem] pt-[4.73rem]"
      >
        <div className="flex flex-col items-center">
          <h1 className="mb-4 text-[1.1rem] text-grey100">팀빌딩의 시작 링킷</h1>
          <Image src="/assets/icons/headerLogo.svg" width={213} height={40} alt="logo" />
          <h2 className="mt-4 text-2xl font-bold">팀빌딩의 시작 링킷</h2>
          <motion.div
            animate={{ y: ['0px', '10px', '0px'] }}
            transition={{ repeat: Infinity, repeatType: 'loop', duration: 2.5, ease: 'easeInOut' }}
          >
            <Image
              src={'/assets/icons/quickStart.svg'}
              width={111}
              height={44}
              alt="quickStart"
              className="pt-[2.5rem]"
            />
          </motion.div>

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
          <p className="w-full pt-[2.37rem] text-center text-xs font-normal text-grey60">
            회원가입 시 linkit의 <Link href="#">서비스 이용약관</Link>과 <Link href="#">개인정보 보호정책</Link>에
            동의하게 됩니다.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
