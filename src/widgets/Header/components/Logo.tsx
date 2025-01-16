'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/common/icons/blue_logo_row.svg" alt="Linkit" width={100} height={20} className="cursor-pointer" />
    </Link>
  )
}
