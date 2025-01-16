import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { googleLogin } from '../api/authApi'
import { LoginResponse } from './authType'

import { useUserStore } from '@/shared/store/useAuthStore'
import { Client } from '@stomp/stompjs'
import createStompClient from '@/shared/utils/stompClient'

export const useGoogleAuth = (code: string | null) => {
  const router = useRouter()
  const { checkLogin } = useUserStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const responseData: LoginResponse = await googleLogin(code)
        let stompClient: Client | null = null
        const { accessToken, email, isMemberBasicInform } = responseData.result

        if (isMemberBasicInform) {
          localStorage.setItem('accessToken', accessToken)
          checkLogin() // 로그인 상태 업데이트
          // 웹 소켓 연결
          if (!stompClient) {
            stompClient = createStompClient(accessToken)
            // 알림 구독
            stompClient.onConnect = () => {
              stompClient?.subscribe(`/sub/notification/${responseData.result.emailId}`, (message) => {
                console.log('New notification:', JSON.parse(message.body))
              })
            }
          }
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
  }, [code, router, checkLogin])

  return { loading }
}
