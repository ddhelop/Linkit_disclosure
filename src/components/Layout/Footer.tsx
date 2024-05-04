'use client'
import { usePathname } from 'next/navigation'
import FooterComponent from './FooterComponent'

export default function Footer() {
  const pathname = usePathname()
  const paths = [
    '/',
    '/login',
    '/onBoarding',
    '/onBoarding/step1',
    '/onBoarding/step2',
    '/onBoarding/step2/person',
    '/onBoarding/step2/team',
    '/onBoarding/step3',
  ]

  if (paths.includes(pathname)) return null

  return <FooterComponent />
}
