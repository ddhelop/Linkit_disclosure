// src/features/auth/hooks/useNaverAuth.ts
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { accessTokenState, emailState } from '@/context/recoil-context'
import { naverLogin } from '../api/authApi'
import { LoginResponse } from './authType'

export const useNaverAuth = (code: string | null) => {
  const router = useRouter()
  const [toEmail, setToEmail] = useRecoilState(emailState)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const responseData: LoginResponse = await naverLogin(code)
        setAccessToken(responseData.accessToken)
        setToEmail(responseData.email)

        if (responseData.existMemberBasicInform) {
          router.push('/')
        } else {
          router.push('/onBoarding')
        }
      } catch (error) {
        console.error('Login failed:', error)
      } finally {
        setLoading(false)
      }
    }
    login()
  }, [code, router, setToEmail, setAccessToken])

  return { loading }
}
