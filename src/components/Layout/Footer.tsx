'use client'
import { usePathname } from 'next/navigation'
import FooterComponent from './FooterComponent'

export default function Footer() {
  const pathname = usePathname()
  const paths = [
    '/',
    '/login',
    '/onBoarding/select',
    '/onBoarding/person/project',
    '/onBoarding/person/role',
    '/onBoarding/person/school',
    '/onBoarding/person/career',
    '/onBoarding/person/profile',
    '/onBoarding/complete',

    '/onBoarding/team/teamCategory',
    '/onBoarding/team/activityWay',
  ]

  if (paths.includes(pathname)) return null

  return <FooterComponent />
}
