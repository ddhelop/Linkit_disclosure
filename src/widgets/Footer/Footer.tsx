'use client'
import { usePathname } from 'next/navigation'
import FooterComponent from './FooterComponent'

export default function Footer() {
  const pathname = usePathname()

  // 📌 특정 경로에서 Header를 숨기기
  const hideHeaderOnPaths = [
    '/login/onboarding-info',
    '/login/onboarding-agree',
    '/login/onboarding-complete',
    '/login',
    '/',
  ]
  const basePath = pathname.split('?')[0] // 쿼리 파라미터 제거된 경로 확인

  if (hideHeaderOnPaths.includes(basePath)) {
    return null
  }

  return <FooterComponent />
}
