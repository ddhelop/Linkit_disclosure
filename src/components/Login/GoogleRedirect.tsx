'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUserContext } from '@/context/store'

const GoogleRedirect = () => {
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const { dispatch } = useUserContext()

  useEffect(() => {
    if (code) {
      const googleLogin = async () => {
        try {
          const response = await fetch(`https://dev.linkit.im/login/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            credentials: 'include', // 쿠키를 포함시키기 위해 필요
            body: JSON.stringify({ code }), // 로그인 요청 본문에 인증 코드 포함
          })
          if (response.ok || response.status === 201) {
            const data = await response.json()
            dispatch({
              type: 'SET_USER_DATA',
              payload: {
                accessToken: data.accessToken,
                email: data.email,
                name: null,
              },
            })
            if (data.memberBasicInform === false) {
              router.push('/onBoarding')
            } else {
              router.push('/')
            }
          } else {
            const errorText = await response.text()
            throw new Error(`로그인에 실패했습니다. 상태 코드: ${response.status}, 메시지: ${errorText}`)
          }
        } catch (error: any) {
          console.error('Error caught:', error)
          setError(error)
        }
      }

      googleLogin()
    }
  }, [code, router, dispatch])

  if (error) return <div>로그인에 실패했습니다. {error.message}</div>

  return <div>로그인 처리 중...</div>
}

export default GoogleRedirect
