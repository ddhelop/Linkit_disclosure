import LogWriteForm from '@/features/profile/edit/log/components/LogWriteForm'
import Image from 'next/image'
import Link from 'next/link'

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
