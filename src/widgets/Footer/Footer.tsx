'use client'
import { usePathname } from 'next/navigation'
import FooterComponent from './FooterComponent'

export default function Footer() {
  const pathname = usePathname()

  // 📌 Footer를 보여줄 특정 경로들
  const showFooterOnPaths = [
    '/',
    '/info',

    // 필요한 경로 추가
  ]

  const basePath = pathname.split('?')[0] // 쿼리 파라미터 제거된 경로 확인

  // 지정된 경로에서만 Footer를 보여줌
  if (!showFooterOnPaths.some((path) => basePath.startsWith(path))) {
    return null
  }

  return <FooterComponent />
}
