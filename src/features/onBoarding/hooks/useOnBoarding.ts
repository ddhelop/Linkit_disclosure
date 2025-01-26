// src/features/member/hooks/useOnBoarding.ts

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { submitMemberInfo } from '../api/memberApi'
import { usePhoneNumberFormatter } from '@/shared/hooks/usePhoneNumberFormatter'

export function useOnBoarding() {
  const [name, setName] = useState('')

  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const [emailId, setEmailId] = useState('')
  const [emailIdError, setEmailIdError] = useState('')

  const router = useRouter()
  const { phoneNumber, setPhoneNumber } = usePhoneNumberFormatter()

  // 영문 또는 영문+숫자 조합 검증
  const isValidEmailId = (id: string) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9]*$/
    return regex.test(id)
  }

  const handleEmailIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setEmailId(newValue)
    setEmailIdError('') // 에러 메시지 초기화
  }

  const isButtonEnabled =
    name.trim() !== '' &&
    phoneNumber.replace(/\D/g, '').length >= 10 &&
    emailId.trim() !== '' &&
    isValidEmailId(emailId)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const submitOnBoardingInfo = async () => {
    if (isButtonEnabled) {
      try {
        const accessToken = sessionStorage.getItem('accessToken') || ''
        const result = await submitMemberInfo(
          {
            memberName: name,
            contact: phoneNumber.replace(/\D/g, ''),
            emailId: emailId,
          },
          accessToken,
        )

        if (result) {
          router.push('/login/onboarding-agree')
        }
      } catch (error: any) {
        if (error.response?.status === 409) {
          setEmailIdError('이미 존재하는 아이디입니다')
        }
      }
    }
  }

  return {
    name,
    phoneNumber,
    email,
    emailId,
    emailIdError,
    setName: handleNameChange,
    setPhoneNumber,
    setEmailId: handleEmailIdChange,
    isButtonEnabled,
    submitOnBoardingInfo,
  }
}
