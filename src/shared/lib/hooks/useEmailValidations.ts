'use client'

import { useState } from 'react'

export function useEmailValidation() {
  const [email, setEmail] = useState('')

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return {
    email,
    setEmail,
    isValid: isValidEmail(email),
  }
}
