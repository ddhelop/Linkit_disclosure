// src/features/profile/api/authApi.ts

// 액세스 토큰을 갱신하는 함수
export async function refreshAccessToken() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}/api/v1/renew/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include', // 쿠키로 리프레시 토큰을 서버에서 관리
    })

    if (!response.ok) {
      throw new Error('Failed to refresh access token')
    }

    const data = await response.json()
    const newAccessToken = data.result.accessToken

    // 새 액세스 토큰을 로컬 스토리지에 저장
    localStorage.setItem('accessToken', newAccessToken)

    return newAccessToken
  } catch (error) {
    console.error('Error refreshing access token:', error)
    throw error // 필요한 경우 로그인 페이지로 리다이렉트 처리 추가
  }
}

// 인증이 필요한 요청을 처리하는 함수
export async function fetchWithAuth(url: string, options: RequestInit = {}, retry = true) {
  const apiUrl = `${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}${url}` // 절대 경로로 변환
  let accessToken = localStorage.getItem('accessToken') || ''

  // 기존 요청에 Authorization 헤더 추가
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  }

  options.credentials = 'include' // 쿠키를 포함하여 요청

  const response = await fetch(apiUrl, options)

  // 403 상태 코드 처리 추가
  if (response.status === 403) {
    // 로그아웃 처리
    localStorage.removeItem('accessToken')
    alert('세션이 만료되었습니다. 다시 로그인해주세요.')
    window.location.href = '/login' // 로그인 페이지로 리다이렉트
    throw new Error('Session expired')
  }

  // 액세스 토큰 만료 시 처리
  if ((response.status === 401 || response.status === 404) && retry) {
    try {
      accessToken = await refreshAccessToken()

      // 갱신된 액세스 토큰으로 재시도
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
      return fetch(apiUrl, options)
    } catch (error) {
      console.error('Redirecting to login due to failed token refresh')

      throw error
    }
  }

  return response
}
