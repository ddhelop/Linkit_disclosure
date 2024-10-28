// src/features/member/api/memberApi.ts

import { MemberInfo } from '../types/memberTypes'

export async function submitMemberInfo(data: MemberInfo, accessToken: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LINKIT_SERVER_URL}/api/v1/member/basic-inform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`Error submitting member info: ${response.statusText}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error submitting member info:', error)
  }
}
