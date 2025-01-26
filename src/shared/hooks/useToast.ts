import { useCallback } from 'react'
import { useToastStore } from '../store/toastStore'

interface UseToastProps {
  message: string
  type: 'alert' | 'success' | 'default'
}

export const useToast = () => {
  const { addToast } = useToastStore()

  const showToast = useCallback(
    ({ message, type }: UseToastProps) => {
      const newToast = {
        id: Date.now(),
        message,
        type,
      }
      addToast(newToast)
    },
    [addToast],
  )

  return {
    success: (message: string) => showToast({ message, type: 'success' }),
    alert: (message: string) => showToast({ message, type: 'alert' }),
    default: (message: string) => showToast({ message, type: 'default' }),
    show: showToast,
  }
}
