// src/shared/hooks/useDateRange.ts
import { useState } from 'react'

export const useDateRange = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  }
}
