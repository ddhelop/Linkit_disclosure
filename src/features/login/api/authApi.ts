// 구글 로그인
export const googleLogin = async (code: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}/api/v1/login/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    credentials: 'include',
    body: JSON.stringify({ code }),
  })

  if (!response.ok) throw new Error('Failed to log in with Google')

  return response.json()
}

// 카카오 로그인
export const kakaoLogin = async (code: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}/api/v1/login/kakao`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    credentials: 'include',
    body: JSON.stringify({ code }),
  })

  const result = await response.json()

  if (!response.ok) throw new Error('Failed to log in with Kakao')
  return result
}

// 네이버 로그인
export const naverLogin = async (code: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}/api/v1/login/naver`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    credentials: 'include',
    body: JSON.stringify({ code }),
  })

  if (!response.ok) throw new Error('Failed to log in with Naver')

  return response.json()
}
