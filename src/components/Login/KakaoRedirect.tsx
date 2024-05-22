'use client'
import { setAuthData } from '@/features/auth/authSlice'
import { useAppDispatch } from '@/hooks'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// 카카오 로그인 후 서버에 전송할 코드를 받아오는 페이지
export default function KakaoRedirect() {
  const params = useSearchParams()
  const code = params.get('code')
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await fetch('https://dev.linkit.im/login/kakao', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          credentials: 'include', // 쿠키를 포함시키기 위해 필요
          body: JSON.stringify({ code: code }), // 로그인 요청 본문에 인증 코드 포함
        })
        if (response.ok) {
          const responseData = await response.json()
          dispatch(
            setAuthData({
              accessToken: responseData.accessToken,
              email: responseData.email,
              memberBasicInform: responseData.memberBasicInform,
            }),
          )

          router.push('/onBoarding')
        } else {
          const errorText = await response.text()
          console.error('Response not ok, status:', response.status, 'text:', errorText)
          throw new Error(`로그인 요청에 실패했습니다. 상태 코드: ${response.status}, 메시지: ${errorText}`)
        }
      } catch (error) {
        console.log('로그인 요청에 실패했습니다.', error)
      }
    }

    kakaoLogin()
  }, [code, router, dispatch])

  return (
    <div>
      <h1>카카오 로그인 후 서버에 전송할 코드를 받아오는 페이지</h1>
    </div>
  )
}
