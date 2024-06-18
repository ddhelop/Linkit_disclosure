'use client'
import { emailState } from '@/context/recoil-context'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

// 카카오 로그인 후 서버에 전송할 코드를 받아오는 페이지
export default function NaverRedirect() {
  const params = useSearchParams()
  const code = params.get('code')
  const router = useRouter()
  const [toEmail, setToEmail] = useRecoilState(emailState)

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await fetch(`https://dev.linkit.im/login/naver`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          credentials: 'include', // 쿠키를 포함시키기 위해 필요
          body: JSON.stringify({ code: code }), // 로그인 요청 본문에 인증 코드 포함
        })
        if (response.ok) {
          const responseData = await response.json()
          window.localStorage.setItem('accessToken', responseData.accessToken)
          setToEmail(responseData.email)

          if (responseData.existMemberBasicInform === true && responseData.existOnBoardingProfile === true) {
            router.push('/')
          } else if (responseData.existMemberBasicInform === true && responseData.existOnBoardingProfile === false) {
            router.push(`/onBoarding/select`)
          } else {
            router.push(`/onBoarding`)
          }
        }
      } catch (error) {
        console.log('로그인 요청에 실패했습니다.', error)
      }
    }
    kakaoLogin()
  }, [code, router, setToEmail])

  return (
    <div>
      <h1>네이버 로그인 후 서버에 전송할 코드를 받아오는 페이지</h1>
    </div>
  )
}
