import TeamEditProduct from '@/features/team/edit/product/TeamEditProduct'
import { Button } from '@/shared/ui/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamEditProductsPage({ params }: { params: { teamName: string } }) {
  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-xl font-bold">프로덕트</h1>

      <Link href={`/team/${params.teamName}/edit/products/new`}>
        <Button
          animationMode="main"
          mode="main2"
          size="custom"
          className="flex w-full items-center justify-center gap-2 rounded-[0.63rem] py-2 text-sm"
        >
          <Image src="/common/icons/plus.svg" width={15} height={15} alt="plus-icon" />
          추가하기
        </Button>
      </Link>

      <TeamEditProduct teamName={params.teamName} />
    </div>
  )
}
