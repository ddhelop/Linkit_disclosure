// src/features/member/hooks/useOnBoarding.ts

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { submitMemberInfo } from '../api/memberApi'
import { usePhoneNumberFormatter } from '@/shared/hooks/usePhoneNumberFormatter'

export function useOnBoarding() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { phoneNumber, setPhoneNumber } = usePhoneNumberFormatter()

  // URL 쿼리스트링에서 이메일 정보 가져오기
  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const isButtonEnabled = name.trim() !== '' && phoneNumber.replace(/\D/g, '').length >= 10

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  // 회원 정보 제출 후 페이지 이동
  const submitOnBoardingInfo = async () => {
    if (isButtonEnabled) {
      const accessToken = sessionStorage.getItem('accessToken') || '' // 세션 스토리지에서 토큰 가져오기
      const result = await submitMemberInfo(
        {
          memberName: name,
          contact: phoneNumber.replace(/\D/g, ''),
        },
        accessToken,
      )

      // 요청 성공 시 동의 페이지로 이동
      if (result) {
        router.push('/login/onboarding-agree')
      }
    }
  }

  return {
    name,
    phoneNumber,
    email,
    setName: handleNameChange,
    setPhoneNumber,
    isButtonEnabled,
    submitOnBoardingInfo,
  }
}
