import { RefObject, useEffect } from 'react'

interface UseOnClickOutsideProps {
  refs?: RefObject<HTMLElement>[] // 기본값을 설정 가능하도록 optional로 변경
  handler: () => void
  isEnabled?: boolean
  shouldListenEscape?: boolean
}

export function useOnClickOutside({
  refs = [],
  handler,
  isEnabled = true,
  shouldListenEscape = true,
}: UseOnClickOutsideProps) {
  useEffect(() => {
    // 브라우저 환경인지 확인
    if (typeof window === 'undefined' || typeof document === 'undefined' || !isEnabled) {
      return
    }

    const clickListener = (event: MouseEvent | TouchEvent) => {
      if (!Array.isArray(refs)) {
        console.warn('Refs should be an array of RefObject elements.')
        return
      }

      const isClickedOutside = refs.every((ref) => !ref.current || !ref.current.contains(event.target as Node))

      if (isClickedOutside) {
        handler()
      }
    }

    const escapeListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler()
      }
    }

    document.addEventListener('mousedown', clickListener)
    document.addEventListener('touchstart', clickListener)

    if (shouldListenEscape) {
      document.addEventListener('keydown', escapeListener)
    }

    return () => {
      document.removeEventListener('mousedown', clickListener)
      document.removeEventListener('touchstart', clickListener)
      if (shouldListenEscape) {
        document.removeEventListener('keydown', escapeListener)
      }
    }
  }, [refs, handler, isEnabled, shouldListenEscape])
}
