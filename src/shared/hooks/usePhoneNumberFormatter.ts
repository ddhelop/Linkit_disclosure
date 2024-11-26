// src/shared/hooks/usePhoneNumberFormatter.ts
import { useState } from 'react'
import { formatPhoneNumber } from '../utils/formatPhoneNumber'

export function usePhoneNumberFormatter(initialValue: string = '') {
  const [phoneNumber, setPhoneNumber] = useState(formatPhoneNumber(initialValue))

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 추출
    const value = event.target.value.replace(/[^0-9]/g, '')

    // 빈 값이거나 숫자만 있는 경우 허용
    if (value === '' || /^\d+$/.test(value)) {
      setPhoneNumber(formatPhoneNumber(value))
    }
  }

  const setInitialPhoneNumber = (value: string) => {
    setPhoneNumber(formatPhoneNumber(value))
  }

  return {
    phoneNumber,
    setPhoneNumber: handlePhoneNumberChange,
    setInitialPhoneNumber,
  }
}
