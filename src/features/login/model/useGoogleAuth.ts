'use client'
// src/features/auth/hooks/useGoogleAuth.ts
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { accessTokenState, authState, emailState } from '@/context/recoil-context'
import { googleLogin } from '../api/authApi'
import { LoginResponse } from './authType'

export const useGoogleAuth = (code: string | null) => {
  const router = useRouter()
  const [toEmail, setToEmail] = useRecoilState(emailState)
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const login = async () => {
      if (!code) return
      try {
        const responseData: LoginResponse = await googleLogin(code)
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
