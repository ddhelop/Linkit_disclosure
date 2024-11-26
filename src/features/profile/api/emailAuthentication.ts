import { fetchWithAuth } from '@/shared/lib/api/fetchWithAuth'

interface EmailAuthenticationResponse {
  success: boolean
  message?: string
}

// 이메일 인증 코드 요청
export const requestEmailAuthentication = async (email: string): Promise<EmailAuthenticationResponse> => {
  const response = await fetchWithAuth('/api/v1/email/re-authentication', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error('Failed to send verification code')
  }

  return response.json()
}

// 이메일 인증 코드 확인 및 이메일 변경
export const verifyEmailAndChange = async (
  changeRequestEmail: string,
  authCode: string,
): Promise<EmailAuthenticationResponse> => {
  const response = await fetchWithAuth('/api/v1/email/verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ changeRequestEmail, authCode }),
  })

  if (!response.ok) {
    throw new Error('Failed to verify email')
  }

  return response.json()
}
