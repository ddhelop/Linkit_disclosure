// hooks/useScrollTopOnMount.ts
'use client'

import { useEffect } from 'react'

/**
 * 컴포넌트 마운트 시 스크롤을 페이지 최상단으로 이동시키는 훅
 */
export const useScrollTopOnMount = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [])
}
