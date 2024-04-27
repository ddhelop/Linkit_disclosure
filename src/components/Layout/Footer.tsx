'use client'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const paths = ['/login', '/onBoarding', '/onBoarding1', '/onBoarding2']

  if (paths.includes(pathname)) return null

  return (
    <>
      <div>123123</div>
    </>
  )
}
