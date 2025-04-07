// 클라이언트 환경에서 텍스트 추출 훅

import { useMemo } from 'react'

interface UseExtractTextProps {
  html: string
  maxLength?: number // 글자 수 제한 (선택)
}

export default function useExtractText({ html, maxLength }: UseExtractTextProps) {
  const plainText = useMemo(() => {
    if (!html) return ''

    // HTML 파싱 및 태그 제거
    const tempElement = document.createElement('div')
    tempElement.innerHTML = html
    const rawText = tempElement.textContent || tempElement.innerText || ''

    // 글자 수 제한
    if (maxLength && rawText.length > maxLength) {
      return rawText.slice(0, maxLength) + '...'
    }

    return rawText
  }, [html, maxLength])

  return plainText
}
