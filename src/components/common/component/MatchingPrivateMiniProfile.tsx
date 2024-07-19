import { SaveProfileType } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

export default function MatchingPrivateMiniProfile({ data }: { data: SaveProfileType }) {
  return (
    <div className="flex w-[21rem] flex-col bg-[#fff] p-5">
      <div className="flex justify-between gap-5">
        <p className="text-xl font-semibold">{data.profileTitle}</p>
        <Image src="/assets/icons/saveIcon.svg" width={20} height={20} alt="close" />
      </div>

      <div className="mt-8 flex gap-2">
        {data.myKeywordNames?.map((keyword, index) => (
          <div key={index} className="rounded-[0.45rem] bg-grey10 px-[0.57rem] py-1 text-sm text-grey60">
            {keyword}
          </div>
        ))}
      </div>

      <div className="mt-[0.94rem] flex justify-between">
        <div className="flex gap-4">
          <Image src="/assets/images/DefaultProfile.png" width={45} height={45} alt="heart" className="rounded-full" />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-grey70">{data.memberName}</p>
            <p className="text-sm text-grey60">{data.jobRoleNames?.join(', ')}</p>
          </div>
        </div>

        <Link href={`/private/${data.id}`}>
          <button className="rounded-[0.29rem] bg-grey100 px-7 py-[0.56rem] text-[#fff]">보기</button>
        </Link>
      </div>
    </div>
  )
}
