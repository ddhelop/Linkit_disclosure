import { getCookie, setCookie } from 'cookies-next'

// 액세스 토큰이 만료되었는지 확인하는 함수
async function accessTokenExpired(token: string | null): Promise<boolean> {
  if (!token) return true
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.exp * 1000 < Date.now()
}

// 리프레시 토큰을 사용해 새로운 액세스 토큰을 가져오는 함수
async function refreshAccessToken() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}/api/v1/renew/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  const data = await response.json()
  setCookie('access-token', data.newAccessToken)
  return data.newAccessToken
}

// fetchWithAuth 함수
async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  let accessToken = getCookie('access-token')

  if (accessToken) {
    // Request 인터셉터: 액세스 토큰이 만료되었으면 갱신
    if (await accessTokenExpired(accessToken)) {
      accessToken = await refreshAccessToken()
    }
  }

  // 요청 헤더에 액세스 토큰 추가
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  }

  // 요청 보내기
  const response = await fetch(url, options)

  // Response 인터셉터: 액세스 토큰 만료 시 리프레시 토큰으로 갱신하고 요청 반복
  if (response.status === 401 && accessToken) {
    accessToken = await refreshAccessToken()

    // 갱신된 액세스 토큰으로 원래 요청을 다시 실행
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    }
    return fetch(url, options)
  }

  return response
}

export default fetchWithAuth
