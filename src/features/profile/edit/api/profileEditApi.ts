export async function fetchProfileData(accessToken: string) {
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
    throw error // 필요에 따라 에러를 다시 던져 호출부에서 처리
  }
}
