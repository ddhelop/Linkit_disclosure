// profileEditApi.ts

export async function fetchProfileData() {
  const accessToken = localStorage.getItem('accessToken') || '' // 클라이언트 컴포넌트에서만 실행 가능
  console.log('accessToken:', accessToken)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}/api/v1/profile/left/menu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`Error fetching profile data: ${response.status} - ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching profile data:', error)
    throw error
  }
}
