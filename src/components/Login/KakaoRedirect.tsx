// KakaoRedirect.tsx
'use client'
import { authState, emailState, accessTokenState } from '@/context/recoil-context'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { motion } from 'framer-motion'

const KakaoRedirect: React.FC = () => {
  const params = useSearchParams()
  const code = params.get('code')
  const router = useRouter()
  const [toEmail, setToEmail] = useRecoilState(emailState)
  const [isAuth, setIsAuth] = useRecoilState(authState)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}/login/kakao`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          credentials: 'include',
          body: JSON.stringify({ code }),
        })
        if (response.ok) {
          const responseData = await response.json()
          setAccessToken(responseData.accessToken)
          setToEmail(responseData.email)
          // setIsAuth(true)

          if (responseData.existMemberBasicInform === true) {
            router.push('/')
          } else {
            router.push(`/onBoarding`)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    if (code) {
      kakaoLogin()
    }
  }, [code, router, setToEmail, setIsAuth, setAccessToken])

  return loading ? (
    <div className="flex h-screen flex-col items-center justify-center">
      <motion.div
        className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  ) : null
}

export default KakaoRedirect
