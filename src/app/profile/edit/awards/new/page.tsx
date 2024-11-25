import NewAwards from '@/features/profile/edit/components/New/NewAwards'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileEditNewAwardsPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <div className="flex justify-start gap-2">
        <Link href="/profile/edit/awards">
          <Image src="/common/icons/arrow-left.svg" alt="back" width={24} height={24} />
        </Link>
        <label className="text-xl font-bold">수상</label>
      </div>

      <div className="mt-5 rounded-xl">
        <NewAwards />
      </div>
    </div>
  )
}
