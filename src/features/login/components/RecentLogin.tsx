'use client'

import Image from 'next/image'

export default function RecentLogin() {
  return (
    <Image
      src="/features/auth/recent_login.svg"
      width={79}
      height={26}
      alt="최근 로그인"
      className="absolute bottom-0 right-5 top-0 m-auto"
    />
  )
}
