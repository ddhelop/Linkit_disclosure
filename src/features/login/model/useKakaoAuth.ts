// src/features/auth/hooks/useKakaoAuth.ts
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { kakaoLogin } from '../api/authApi'
import { LoginResponse } from './authType'

export const useKakaoAuth = (code: string | null) => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const responseData: LoginResponse = await kakaoLogin(code)

        setAccessToken(responseData.result.accessToken)

        if (responseData.result.existMemberBasicInform) {
          router.push('/')
        } else {
          // URL에 이메일과 이름을 쿼리 파라미터로 포함하여 온보딩 페이지로 이동
          const email = responseData.result.email
          router.push(`/login/onboarding-info?email=${email}`)
        }
      } catch (error) {
        console.error('Login failed:', error)
      } finally {
        setLoading(false)
      }
    }
    login()
  }, [code, router, setAccessToken])

  return { loading }
}
