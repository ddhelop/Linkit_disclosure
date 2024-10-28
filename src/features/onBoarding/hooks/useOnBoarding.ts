// src/features/member/hooks/useOnBoarding.ts

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { submitMemberInfo } from '../api/memberApi'

export function useOnBoarding() {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

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

  // 전화번호 입력 시 자동으로 하이픈(-) 추가
  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '')
    if (input.length > 11) return

    const formattedNumber = input.replace(
      /(\d{3})(\d{0,4})(\d{0,4})/,
      (match, p1, p2, p3) => `${p1}${p2 ? `-${p2}` : ''}${p3 ? `-${p3}` : ''}`,
    )
    setPhoneNumber(formattedNumber)
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
    setPhoneNumber: handlePhoneNumberChange,
    isButtonEnabled,
    submitOnBoardingInfo,
  }
}
