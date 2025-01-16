import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { naverLogin } from '../api/authApi'
import { LoginResponse } from './authType'

import { useUserStore } from '@/shared/store/useAuthStore'
import { useStompStore } from '@/shared/store/useStompStore'
import createStompClient from '@/shared/utils/stompClient'
import { Client } from '@stomp/stompjs'

export const useNaverAuth = (code: string | null) => {
  const router = useRouter()
  const { checkLogin, setEmailId } = useUserStore()
  const connect = useStompStore((state) => state.connect)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const responseData: LoginResponse = await naverLogin(code)
        let stompClient: Client | null = null
        const { accessToken, email, isMemberBasicInform } = responseData.result
        setEmailId(responseData.result.emailId)
        if (isMemberBasicInform) {
          localStorage.setItem('accessToken', accessToken)
          checkLogin()
          connect(accessToken)

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
