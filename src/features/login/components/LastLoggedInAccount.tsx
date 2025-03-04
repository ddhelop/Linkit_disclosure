'use client'

import Image from 'next/image'

export default function LastLoggedInAccount() {
  return (
    <>
      <Image
        src="/features/auth/last_logged_in_account.svg"
        width={154}
        height={32}
        alt="마지막으로 로그인한 계정"
        className="absolute bottom-0 left-[-160px] top-0 m-auto hidden md:block"
      />
      <Image
        src="/features/auth/last_logged_in_account_mobile.svg"
        width={142}
        height={23}
        alt="마지막으로 로그인한 계정"
        className="absolute right-2 top-[-12px] md:hidden"
      />
    </>
  )
}
