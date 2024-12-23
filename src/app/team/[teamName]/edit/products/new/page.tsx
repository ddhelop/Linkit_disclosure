import TeamEditProductNew from '@/features/team/edit/product/TeamEditProductNew'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamEditProductNewPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="flex flex-col gap-5">
      <Link href={`/team/${params.teamName}/edit/products`} className="flex gap-2">
        <Image src="/common/icons/arrow-left.svg" width={24} height={24} alt="back" />
        <label className="text-xl font-bold">프로덕트</label>
      </Link>

      <TeamEditProductNew teamName={params.teamName} />
    </div>
  )
}
