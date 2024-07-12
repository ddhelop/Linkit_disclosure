import { TeamMiniProfileResponse } from '@/lib/types'
import Image from 'next/image'

interface TeamResumNavProps {
  data: TeamMiniProfileResponse | null // 데이터가 null일 수 있으므로 타입을 변경합니다.
}

export default function TeamNavProfile({ data }: TeamResumNavProps) {
  console.log('data', data)
  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#fff] p-5">
      <div className="pt-[0.42rem] text-[1.25rem] font-bold leading-[1.375rem]">
        {data ? data.teamProfileTitle : 'null'}
      </div>

      <div className="mt-3 flex w-full gap-1">
        {data?.teamKeywordNames.map((keyword, index) => (
          <span
            key={index}
            className="rounded-[0.44rem] bg-[#D3E1FE33] bg-opacity-20 px-[0.56rem] py-1 text-sm text-grey60"
          >
            {keyword}
          </span>
        ))}
      </div>

      <div className="mt-8 flex w-full items-center gap-4 rounded-[0.44rem] p-[0.62rem]">
        <div className="relative w-auto rounded-[14.8rem] bg-grey30 ">
          <Image
            src={data?.teamLogoImageUrl || '/assets/icons/flag.svg'}
            width={41}
            height={41}
            alt="flag"
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col gap-[0.12rem] pr-9">
          <p className="text-sm font-semibold text-[#2563EB]">{data ? data.teamName : 'null'}</p>
          <div className="flex gap-3">
            <p className="text-sm text-grey60">분야 | {data ? data.sectorName : 'null'}</p>
            <p className="text-sm text-grey60">규모 | {data ? data.sizeType : 'null'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
