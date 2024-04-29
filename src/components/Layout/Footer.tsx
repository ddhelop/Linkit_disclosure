'use client'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const paths = ['/login', '/onBoarding', '/onBoarding/step1', '/onBoarding/step2', '/onBoarding/step3']

  if (paths.includes(pathname)) return null

  return (
    <>
      <div>123123</div>
    </>
  )
}
