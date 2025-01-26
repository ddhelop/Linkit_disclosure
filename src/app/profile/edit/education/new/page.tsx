import NewEducation from '@/features/profile/edit/components/New/NewEducation'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfileEditEducationPage() {
  return (
    <>
      <Link href="/profile/edit/education" className="flex items-center gap-2">
        <Image src="/common/icons/arrow-left.svg" width={24} height={24} alt="뒤로가기" />
        <label className="text-xl font-bold">학력</label>
      </Link>

      <div className="mt-5 rounded-xl">
        <NewEducation />
      </div>
    </>
  )
}
