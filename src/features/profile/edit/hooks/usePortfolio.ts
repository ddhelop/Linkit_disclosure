import { useState } from 'react'
import { addPortfolio } from '../api/portfolio'

export const usePortfolio = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitPortfolio = async (formData: FormData, accessToken: string) => {
    try {
      setIsLoading(true)
      setError(null)
      await addPortfolio(formData, accessToken)
    } catch (err) {
      setError(err instanceof Error ? err.message : '포트폴리오 추가 중 오류가 발생했습니다.')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { submitPortfolio, isLoading, error }
}
