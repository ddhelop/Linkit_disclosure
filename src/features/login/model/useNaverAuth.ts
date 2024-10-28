import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { accessTokenState } from '@/context/recoil-context'
import { kakaoLogin, naverLogin } from '../api/authApi'
import { LoginResponse } from './authType'

export const useKakaoAuth = (code: string | null) => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const responseData: LoginResponse = await naverLogin(code)
        const { accessToken, email, isMemberBasicInform } = responseData.result

        if (isMemberBasicInform) {
          // 기존 회원: Recoil 상태에 토큰 저장 후 홈으로 이동
          setAccessToken(accessToken)
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
  }, [code, router, setAccessToken])

  return { loading }
}
