'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

// LogWriteForm을 동적으로 임포트
const LogWriteForm = dynamic(() => import('@/features/logWrite/ui/LogWriteForm'), { ssr: false })

export default function LogWritePage() {
  return (
    <>
      <Link href="/profile/edit/log" className="flex gap-2">
        <Image src="/common/icons/arrow-left.svg" width={24} height={24} alt="back" />
        <label className="text-xl font-bold">로그 작성</label>
      </Link>
      <div className="mt-5 rounded-xl">
        <LogWriteForm domainType="PROFILE" />
      </div>
    </>
  )
}
