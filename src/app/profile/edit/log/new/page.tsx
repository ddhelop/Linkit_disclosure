// LogWritePage.tsx
import LogWriteForm from '@/features/profile/edit/log/components/LogWriteForm'
import Image from 'next/image'
import Link from 'next/link'

export default function LogWritePage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <Link href="/profile/edit/log" className="flex gap-2">
        <Image src="/common/icons/arrow-left.svg" width={24} height={24} alt="back" />
        <label className="text-xl font-bold">로그 작성</label>
      </Link>
      <div className="mt-5 rounded-xl">
        <LogWriteForm />
      </div>
    </div>
  )
}
