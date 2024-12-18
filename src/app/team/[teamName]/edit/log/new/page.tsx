'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

// LogWriteForm을 동적으로 임포트
const LogWriteForm = dynamic(() => import('@/features/profile/edit/log/components/LogWriteForm'), { ssr: false })

export default function TeamEditLogNewPage() {
  return (
    <div className="flex flex-col gap-5">
      <Link href="/team/123/edit/log" className="flex gap-2">
        <Image src="/common/icons/arrow-left.svg" width={24} height={24} alt="back" />
        <label className="text-xl font-bold">로그 작성</label>
      </Link>
      <LogWriteForm />
    </div>
  )
}
