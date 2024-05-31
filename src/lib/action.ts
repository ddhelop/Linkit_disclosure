// 로그아웃
export async function Logout(accessToken: string) {
  const response = await fetch('https://dev.linkit.im/logout', {
    method: 'DELETE',
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return response
}

// 온보딩 데이터 fetch
export async function GetOnBoardingData(accessToken: string) {
  const response = await fetch(`https://dev.linkit.im/profile/onBoarding`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  return await response.json()
}

export const RefreshAccessToken = async (accessToken: string) => {
  const response = await fetch('https://dev.linkit.im/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  })

  const data = await response.json()
  return data.accessToken
}
