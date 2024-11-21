import NewCertificate from '@/features/profile/edit/components/New/NewCertificate'
import Link from 'next/link'
import Image from 'next/image'

export default function ProfileEditNewCertificationsPage() {
  return (
    <div className="pl-[4.25rem] pr-[8.69rem] pt-[3.75rem]">
      <div className="flex items-center gap-2">
        <Link href="/profile/edit/certifications">
          <Image src="/common/icons/arrow-left.svg" alt="back" width={24} height={24} />
        </Link>
        <label className="text-xl font-bold">자격증</label>
      </div>

      <div className="mt-5 rounded-xl">
        <NewCertificate />
      </div>
    </div>
  )
}
