'use client'
import { emailState } from '@/context/recoil-context'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { motion } from 'framer-motion'

// 구글 로그인 후 서버에 전송할 코드를 받아오는 페이지
const GoogleRedirect: React.FC = () => {
  const params = useSearchParams()
  const code = params.get('code')
  const router = useRouter()
  const [toEmail, setToEmail] = useRecoilState(emailState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const googleLogin = async () => {
      try {
        const response = await fetch(`${process.env.LINKIT_SERVER_URL}/login/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          credentials: 'include', // 쿠키를 포함시키기 위해 필요
          body: JSON.stringify({ code: code }), // 로그인 요청 본문에 인증 코드 포함
        })
        if (response.ok) {
          const responseData = await response.json()
          window.localStorage.setItem('accessToken', responseData.accessToken)
          setToEmail(responseData.email)

          if (responseData.existMemberBasicInform === true && responseData.existOnBoardingProfile === true) {
            router.push('/')
          } else if (responseData.existMemberBasicInform === true && responseData.existOnBoardingProfile === false) {
            router.push(`/onBoarding/select`)
          } else {
            router.push(`/onBoarding`)
          }
        }
      } catch (error) {
        console.log('로그인 요청에 실패했습니다.', error)
      } finally {
        setLoading(false)
      }
    }
    googleLogin()
  }, [code, router, setToEmail])

  return loading ? (
    <div className="flex h-screen flex-col items-center justify-center">
      <motion.div
        className="border-t-blue-500 border-blue-200 h-12 w-12 animate-spin rounded-full border-4"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  ) : null
}

export default GoogleRedirect
