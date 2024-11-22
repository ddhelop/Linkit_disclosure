import NewHistory from '@/features/profile/edit/components/New/NewHistory'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileEditNewHistotyPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <div className="flex items-center gap-2">
        <Link href="/profile/edit/history">
          <Image src="/common/icons/arrow-left.svg" alt="back" width={24} height={24} />
        </Link>
        <label className="text-xl font-bold">이력</label>
      </div>

      <div className="mt-5 rounded-xl">
        <NewHistory />
      </div>
    </div>
  )
}
