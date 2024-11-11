// src/shared/hooks/usePhoneNumberFormatter.ts
import { useState } from 'react'
import { formatPhoneNumber } from '../utils/formatPhoneNumber'

export function usePhoneNumberFormatter() {
  const [phoneNumber, setPhoneNumber] = useState('')

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(event.target.value)
    setPhoneNumber(formattedNumber)
  }

  return {
    phoneNumber,
    setPhoneNumber: handlePhoneNumberChange,
  }
}
