// src/features/member/hooks/useOnBoarding.ts

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { submitMemberInfo } from '../api/memberApi'
import { usePhoneNumberFormatter } from '@/shared/hooks/usePhoneNumberFormatter'

export function useOnBoarding() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [userIdError, setUserIdError] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { phoneNumber, setPhoneNumber } = usePhoneNumberFormatter()

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  // 영문 또는 영문+숫자 조합 검증
  const isValidUserId = (id: string) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9]*$/
    return regex.test(id)
  }

  const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setUserId(newValue)
    setUserIdError('') // 에러 메시지 초기화
  }

  const isButtonEnabled =
    name.trim() !== '' && phoneNumber.replace(/\D/g, '').length >= 10 && userId.trim() !== '' && isValidUserId(userId)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const submitOnBoardingInfo = async () => {
    if (isButtonEnabled) {
      try {
        const accessToken = sessionStorage.getItem('accessToken') || ''
        const result = await submitMemberInfo({
          memberName: name,
          contact: phoneNumber.replace(/\D/g, ''),
          userId: userId,
          emailId: email,
        })

        if (result) {
          router.push('/login/onboarding-agree')
        }
      } catch (error: any) {
        if (error.response?.status === 409) {
          setUserIdError('이미 존재하는 아이디입니다')
        }
      }
    }
  }

  return {
    name,
    phoneNumber,
    email,
    userId,
    userIdError,
    setName: handleNameChange,
    setPhoneNumber,
    setUserId: handleUserIdChange,
    isButtonEnabled,
    submitOnBoardingInfo,
  }
}
