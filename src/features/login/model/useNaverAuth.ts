import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { naverLogin } from '../api/authApi'

import { useAuthStore } from '@/shared/store/useAuthStore'

export const useNaverAuth = (code: string | null) => {
  const router = useRouter()
  const { setLoginState, setEmailId } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const response = await naverLogin(code)
        const { accessToken, email, isMemberBasicInform, emailId } = response.result

        // 쿠키에 액세스 토큰 저장

        if (isMemberBasicInform) {
          document.cookie = `accessToken=${accessToken}; path=/; max-age=3600`
          setLoginState(true)
          setEmailId(emailId)
          router.push('/')
        } else {
          // 세션스토리지에 액세스토큰 저장
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
  }, [code, router, setLoginState, setEmailId])

  return { loading }
}
