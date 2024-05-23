'use client'

import { setFullAuthData } from '@/features/auth/authSlice'
import { useAppDispatch } from '@/hooks'
import { AuthResponseData } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

// 네이버 로그인 후 서버에 전송할 코드를 받아오는 페이지
export default function GoogleRedirect() {
  const router = useRouter()
  // const dispatch = useAppDispatch()

  // silent refresh 요청 함수
  // const onSilentRefresh = useCallback(async () => {
  //   try {
  //     const response = await fetch('https://dev.linkit.im/token', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json;charset=utf-8' },
  //       credentials: 'include',
  //     })

  //     onLoginSuccess(await response.json())
  //   } catch (error) {
  //     console.log('silent refresh failed', error)
  //   }
  // }, [dispatch])

  // 로그인 성공 시 실행할 함수
  // const onLoginSuccess = useCallback(
  //   (responseData: AuthResponseData) => {
  //     dispatch(
  //       setFullAuthData({
  //         accessToken: responseData.accessToken,
  //         email: responseData.email,
  //         memberBasicInform: responseData.memberBasicInform,
  //       }),
  //     )
  //     // 2시간-1분마다 silent refresh 요청
  //     setTimeout(onSilentRefresh, 7200 * 1000 - 60000)
  //   },
  //   [dispatch, onSilentRefresh],
  // )

  useEffect(() => {
    // URLSearchParams 객체를 사용하여 쿼리스트링을 파싱
    const params = new URLSearchParams(window.location.search)
    const rawCode = params.get('code')
    const encodedCode = rawCode ? encodeURIComponent(rawCode) : null

    const googleLogin = async () => {
      try {
        const response = await fetch('https://dev.linkit.im/login/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          // credentials: 'include', // 쿠키를 포함시키기 위해 필요
          body: JSON.stringify({ code: encodedCode }), // 로그인 요청 본문에 인증 코드 포함
        })
        console.log('response:', response.json())
        if (response.ok) {
          const responseData = await response.json()
          console.log('response:', responseData)
          // onLoginSuccess(responseData)
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

    googleLogin()
  }, [router])

  return (
    <div>
      <h1>카카오 로그인 후 서버에 전송할 코드를 받아오는 페이지</h1>
    </div>
  )
}
