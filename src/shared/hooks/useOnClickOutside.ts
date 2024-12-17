import { RefObject, useEffect } from 'react'

interface UseOnClickOutsideProps {
  refs?: RefObject<HTMLElement>[] // 기본값을 설정 가능하도록 optional로 변경
  handler: () => void
  isEnabled?: boolean
  shouldListenEscape?: boolean
}

export function useOnClickOutside({
  refs = [], // 기본값: 빈 배열
  handler,
  isEnabled = true,
  shouldListenEscape = true,
}: UseOnClickOutsideProps) {
  useEffect(() => {
    if (!isEnabled) return

    const clickListener = (event: MouseEvent | TouchEvent) => {
      // refs가 배열인지 확인
      if (!Array.isArray(refs)) {
        console.warn('Refs should be an array of RefObject elements.')
        return
      }

      // 모든 ref가 클릭 외부인지 확인
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

    // 이벤트 리스너 등록
    document.addEventListener('mousedown', clickListener)
    document.addEventListener('touchstart', clickListener)

    if (shouldListenEscape) {
      document.addEventListener('keydown', escapeListener)
    }

    // 클린업
    return () => {
      document.removeEventListener('mousedown', clickListener)
      document.removeEventListener('touchstart', clickListener)
      if (shouldListenEscape) {
        document.removeEventListener('keydown', escapeListener)
      }
    }
  }, [refs, handler, isEnabled, shouldListenEscape])
}
