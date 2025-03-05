import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { naverLogin } from '../api/authApi'

import { useAuthStore } from '@/shared/store/useAuthStore'
import { useRecentLoginStore } from '@/shared/store/useRecentLoginStore'
import useWebSocketStore from '@/shared/store/useWebSocketStore'

export const useNaverAuth = (code: string | null) => {
  const router = useRouter()
  const { setLoginState, setEmailId } = useAuthStore()
  const { setPlatform } = useRecentLoginStore()
  const [loading, setLoading] = useState(true)
  const { initializeClient } = useWebSocketStore()

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const response = await naverLogin(code)
        const { accessToken, email, isMemberBasicInform, emailId } = response.result

        // 쿠키에 액세스 토큰 저장

        if (isMemberBasicInform) {
          document.cookie = `accessToken=${accessToken}; path=/;`
          setLoginState(true)
          setEmailId(emailId)
          setPlatform('naver')

          // 로그인 성공 후 한 번만 웹소켓 연결
          initializeClient(accessToken)
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
  }, [code])

  return { loading }
}
