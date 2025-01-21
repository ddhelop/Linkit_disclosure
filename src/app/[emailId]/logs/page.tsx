import Image from 'next/image'
import Link from 'next/link'

export default function ProfileViewLogsPage({ params }: { params: { emailId: string } }) {
  return (
    <div className="flex flex-col px-[4.25rem] py-[3.62rem]">
      <Link href={`/${params.emailId}`} className="flex items-center gap-2">
        <Image src="/common/icons/arrow-left.svg" width={24} height={24} alt="arrow" />
        <span className="text-xl font-semibold text-black">뒤로가기</span>
      </Link>
    </div>
  )
}
