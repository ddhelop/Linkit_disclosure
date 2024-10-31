import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { kakaoLogin } from '../api/authApi'
import { LoginResponse } from './authType'
import { setCookie } from 'cookies-next'

export const useKakaoAuth = (code: string | null) => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const responseData: LoginResponse = await kakaoLogin(code)
        const { accessToken, email, isMemberBasicInform } = responseData.result

        if (isMemberBasicInform) {
          // 기존 회원: Recoil 상태에 토큰 저장 후 홈으로 이동
          setCookie('access-token', accessToken)

          router.push('/')
        } else {
          // 신규 회원: 세션 스토리지에 토큰 저장 후 온보딩 페이지로 이동
          sessionStorage.setItem('accessToken', accessToken)
          router.push(`/login/onboarding-info?email=${email}`)
        }
      } catch (error) {
        console.error('Login failed:', error)
      } finally {
        setLoading(false)
      }
    }

    login()
  }, [code, router])

  return { loading }
}
