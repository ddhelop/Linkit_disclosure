import NewPortFolio from '@/features/profile/edit/components/New/NewPortFolio'
import Image from 'next/image'
import Link from 'next/link'

export default function NewPortFolioPage() {
  return (
    <>
      <Link href="/profile/edit/portfolio" className="flex items-center gap-2">
        <Image src="/common/icons/arrow-left.svg" width={24} height={24} alt="뒤로가기" />
        <label className="text-xl font-bold">포트폴리오</label>
      </Link>

      <div className="mt-5 rounded-xl">
        <NewPortFolio />
      </div>
    </>
  )
}
