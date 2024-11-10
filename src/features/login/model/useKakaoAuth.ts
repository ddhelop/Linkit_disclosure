import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { kakaoLogin } from '../api/authApi'
import { LoginResponse } from './authType'
import { setCookie } from 'cookies-next'
import { useUserStore } from '@/shared/store/useAuthStore'

export const useKakaoAuth = (code: string | null) => {
  const router = useRouter()
  const { checkLogin } = useUserStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const responseData: LoginResponse = await kakaoLogin(code)
        const { accessToken, email, isMemberBasicInform } = responseData.result

        if (isMemberBasicInform) {
          // 기존 회원: Recoil 상태에 토큰 저장 후 홈으로 이동
          localStorage.setItem('accessToken', accessToken)
          checkLogin() // 로그인 상태 업데이트
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
