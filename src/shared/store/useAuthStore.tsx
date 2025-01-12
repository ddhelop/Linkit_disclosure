import { create } from 'zustand'
import { logoutApi } from '@/features/login/api/authApi'
import createStompClient from '../utils/stompClient'
import Stomp, { Client } from '@stomp/stompjs'

interface userInfoProps {
  isLogin: boolean // 로그인 여부
  emailId: string | null // 이메일 아이디
  checkLogin: () => void // 로그인 여부 확인 함수
  logout: () => void // 로그아웃
  setEmailId: (emailId: string) => void // 이메일 아이디 설정 함수
}

export const useUserStore = create<userInfoProps>((set, get) => {
  let stompClient: Stomp.Client | null = null

  return {
    isLogin: false,
    emailId: null,

    checkLogin: () => {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        set({ isLogin: true })

        if (!stompClient) {
          stompClient = createStompClient(accessToken)
          const currentEmailId = get().emailId
          // 알림 구독 설정
          stompClient.subscribe(`/sub/notification/${currentEmailId}`, (message) => {
            console.log('New notification:', JSON.parse(message.body))
          })
        }

        // 회원 알림 구독
      } else {
        set({ isLogin: false })
      }
    },
    setEmailId: (emailId: string) => {
      set({ emailId })
    },

    logout: async () => {
      await logoutApi() // 로그아웃 API 호출
      localStorage.removeItem('accessToken')
      if (stompClient) {
        stompClient.deactivate()
        stompClient = null
      }
      set({ isLogin: false })
    },
  }
})
