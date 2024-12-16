import { RefObject, useEffect } from 'react'

interface UseOnClickOutsideProps {
  refs: RefObject<HTMLElement>[]
  handler: () => void
  isEnabled?: boolean
  shouldListenEscape?: boolean
}

export function useOnClickOutside({
  refs,
  handler,
  isEnabled = true,
  shouldListenEscape = true,
}: UseOnClickOutsideProps) {
  useEffect(() => {
    if (!isEnabled) return

    const clickListener = (event: MouseEvent | TouchEvent) => {
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
