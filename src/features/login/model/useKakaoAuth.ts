import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { kakaoLogin } from '../api/authApi'

import { useAuthStore } from '@/shared/store/useAuthStore'
import { useLastLoggedInStore } from '@/shared/store/useLastLoggedInStore'

export const useKakaoAuth = (code: string | null) => {
  const router = useRouter()
  const { setLoginState, setEmailId } = useAuthStore()
  const { setPlatform } = useLastLoggedInStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const response = await kakaoLogin(code)
        const { accessToken, email, isMemberBasicInform, emailId } = response.result

        if (isMemberBasicInform) {
          document.cookie = `accessToken=${accessToken}; path=/;`
          setLoginState(true)
          setEmailId(emailId)
          setPlatform('kakao')
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
