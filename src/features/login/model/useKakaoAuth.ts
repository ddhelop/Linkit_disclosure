import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { kakaoLogin } from '../api/authApi'
import { LoginResponse } from './authType'

import { useAuthStore } from '@/shared/store/useAuthStore'
import { Client } from '@stomp/stompjs'
import createStompClient from '@/shared/utils/stompClient'

export const useKakaoAuth = (code: string | null) => {
  const router = useRouter()
  const { setLoginState, setEmailId } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const response = await kakaoLogin(code)
        const { accessToken, email, isMemberBasicInform, emailId } = response.result

        document.cookie = `accessToken=${accessToken}; path=/; max-age=3600`

        if (isMemberBasicInform) {
          setLoginState(true)
          setEmailId(emailId)
          router.push('/')
        } else {
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
